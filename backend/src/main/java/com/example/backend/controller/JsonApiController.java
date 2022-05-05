package com.example.backend.controller;

import com.example.backend.Repositories.BalanceHistoryRepository;
import com.example.backend.Repositories.BankAccountRepository;
import com.example.backend.Repositories.UserRepository;
import com.example.backend.model.*;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicReference;

@RestController
public class JsonApiController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BankAccountRepository bankAccountRepository;

    @Autowired
    BalanceHistoryRepository balanceHistoryRepository;

    @CrossOrigin
    @GetMapping("/AccountsList")
    public String getBankAccounts() {
        Gson gsonBuilder = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().serializeNulls().create();
        return gsonBuilder.toJson(userRepository.findTopByOrderByIdAsc().getBankAccountList());
    }

    @CrossOrigin
    @GetMapping("/TotalBalance")
    public double getTotalBalance() {
        return countTotalBalance();
    }

    @CrossOrigin
    @GetMapping("/BalanceOperations")
    public String getBalanceOperations(@RequestParam(value = "page") int page,
                                       @RequestParam(value = "chartInterval") int chartInterval) {
        java.sql.Date currentDate = new java.sql.Date(Calendar.getInstance().getTime().getTime());
        updateRepetitiveTransaction(currentDate);

        Calendar c = Calendar.getInstance();
        c.setTime(currentDate);
        c.add(Calendar.DATE, page * chartInterval);
        java.sql.Date futureDate = new java.sql.Date(c.getTimeInMillis());

        List<BalanceHistory> balanceHistoryList = getBalanceHistoryForFuture(futureDate, chartInterval);

        Gson gsonBuilder = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().setDateFormat("yyyy-MM-dd").serializeNulls().create();
        return gsonBuilder.toJson(balanceHistoryList);
    }

    @CrossOrigin
    @GetMapping("/UncompletedGoals")
    public String getUncompletedGoals() {
        List<Goal> goalList = getGoals(false);

        Gson gsonBuilder = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().serializeNulls().create();
        return gsonBuilder.toJson(goalList);
    }

    @CrossOrigin
    @GetMapping("/CompletedGoals")
    public String getCompletedGoals() {
        List<Goal> goalList = getGoals(true);

        Gson gsonBuilder = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().serializeNulls().create();
        return gsonBuilder.toJson(goalList);
    }

    @CrossOrigin
    @GetMapping("/GoalRealization")
    public String getGoalRealizationDate() {
        List<Goal> uncompletedGoalList = getGoals(false);
        List<GoalRealization> goalRealizations = new ArrayList<>();
        double currentMoneyAmount = countTotalBalance();

        java.sql.Date currentDate = new java.sql.Date(Calendar.getInstance().getTime().getTime());
        updateRepetitiveTransaction(currentDate);

        Calendar c = Calendar.getInstance();

        c.setTime(currentDate);
        c.add(Calendar.DATE, 0);
        java.sql.Date futureDate = new java.sql.Date(c.getTimeInMillis());

        int i=0;
        while(uncompletedGoalList.size()>0 && i <3650) {
            c.setTime(currentDate);
            c.add(Calendar.DATE, i);
            futureDate = new java.sql.Date(c.getTimeInMillis());

            List<BalanceHistory> balanceHistoryList = getBalanceHistoryForFuture(futureDate, 1);

            for(BalanceHistory balanceHistory: balanceHistoryList){
                if(balanceHistory.getType() == ActionType.Przychód){
                    currentMoneyAmount += balanceHistory.getAmount();
                }
                else if(balanceHistory.getType() == ActionType.Wydatek){
                    currentMoneyAmount -= balanceHistory.getAmount();
                }
            }

//            System.out.println(currentMoneyAmount+" "+i);

            double finalCurrentMoneyAmount = currentMoneyAmount;
            List<Goal> toRemove = new ArrayList<>();
            java.sql.Date finalFutureDate = futureDate;
            uncompletedGoalList.forEach(goal->
                    {
                        double sum = goal.getGoalElementList().stream().filter(goalElement -> !goalElement.isAchieved()).mapToDouble(GoalElement::getCost).sum();
                        if(sum <= finalCurrentMoneyAmount){
                            goalRealizations.add(new GoalRealization(goal, finalFutureDate));
                            toRemove.add(goal);
                        }
                    }
            );

            for(Goal goal:toRemove){
                uncompletedGoalList.remove(goal);
            }

            i++;
        }

        Gson gsonBuilder = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().setDateFormat("yyyy-MM-dd").serializeNulls().create();
        return gsonBuilder.toJson(goalRealizations);
    }

    private List<Goal> getGoals(boolean completed){
        List<Goal> goalList = new ArrayList<>();

        userRepository.findTopByOrderByIdAsc().getGoals()
                .forEach(goal->
                        {
                            AtomicBoolean flag = new AtomicBoolean(true);
                            goal.getGoalElementList()
                                    .forEach(goalElement -> {
                                        if(!goalElement.isAchieved()){
                                            flag.set(false);
                                        }
                                    });
                            if(completed && flag.get()){
                                goalList.add(goal);
                            }
                            if(!completed && !flag.get()){
                                goalList.add(goal);

                            }
                        }
                );

        return goalList;
    }

    private double countTotalBalance(){
        return userRepository.findTopByOrderByIdAsc().getBankAccountList().stream().mapToDouble(BankAccount::getAccountBalance).sum();
    }

    private List<BalanceHistory> getBalanceHistoryForFuture(java.sql.Date startDate, int chartInterval) {

        Calendar c = Calendar.getInstance();
        c.setTime(startDate);
        c.add(Calendar.DATE, chartInterval);
        java.sql.Date endDate = new java.sql.Date(c.getTimeInMillis());

        List<BalanceHistory> resultList = new ArrayList<>();
        List<BankAccount> bankAccountList = userRepository.findTopByOrderByIdAsc().getBankAccountList();

        bankAccountList.forEach(bankAccount -> bankAccount.getBalanceHistories().stream()
                .filter(balanceHistory -> balanceHistory.getRepeatInterval() != 0)
                .filter(balanceHistory -> balanceHistory.getEndBillingDate().after(startDate))
//                .filter(balanceHistory -> balanceHistory.getBillingDate().before(startDate))
                .forEach(balanceHistory -> {
                            while (balanceHistory.getBillingDate().before(endDate)) {
                                if(balanceHistory.getBillingDate().after(startDate) && balanceHistory.getBillingDate().before(endDate)) {
                                    BalanceHistory balanceHistoryCopy = new BalanceHistory(balanceHistory);
                                    resultList.add(balanceHistoryCopy);
                                }
                                balanceHistory.addToStartBillingDate();
                            }
                        }
                ));

        bankAccountList.forEach(bankAccount -> bankAccount.getBalanceHistories()
                .forEach(balanceHistory -> {
                            if (balanceHistory.getRepeatInterval() == 0  && balanceHistory.getBillingDate().after(startDate) && balanceHistory.getBillingDate().before(endDate)) {
                                resultList.add(balanceHistory);
                            }
                        }
                ));

        return resultList;
    }

    private void updateRepetitiveTransaction(java.sql.Date currentDate) {

        userRepository.findTopByOrderByIdAsc().getBankAccountList()
                .forEach(bankAccount -> bankAccount.getBalanceHistories().stream()
                        .filter(balanceHistory -> balanceHistory.getRepeatInterval() != 0)
                        .filter(balanceHistory -> balanceHistory.getEndBillingDate().after(currentDate))
                        .filter(balanceHistory -> balanceHistory.getBillingDate().before(currentDate))
                        .forEach(balanceHistory -> {
                                    while (balanceHistory.getBillingDate().before(currentDate)) {
                                        balanceHistory.addToStartBillingDate();
                                        if(balanceHistory.getType() == ActionType.Wydatek) {
                                            balanceHistory.getBankAccount().subtractBalance(balanceHistory.getAmount());
                                        }
                                        if(balanceHistory.getType() == ActionType.Przychód) {
                                            balanceHistory.getBankAccount().addBalance(balanceHistory.getAmount());
                                        }
                                        bankAccountRepository.save(balanceHistory.getBankAccount());
                                    }
                                    balanceHistoryRepository.save(balanceHistory);
                                }
                        ));


        userRepository.findTopByOrderByIdAsc().getBankAccountList()
                .forEach(bankAccount -> bankAccount.getBalanceHistories().stream()
                        .filter(balanceHistory -> balanceHistory.getRepeatInterval() == 0)
                        .filter(balanceHistory -> balanceHistory.getBillingDate().before(currentDate))
                        .filter(balanceHistory -> !balanceHistory.isPaid())
                        .forEach(balanceHistory -> {
                                    if(balanceHistory.getType() == ActionType.Wydatek) {
                                        balanceHistory.getBankAccount().subtractBalance(balanceHistory.getAmount());
                                    }
                                    if(balanceHistory.getType() == ActionType.Przychód) {
                                        balanceHistory.getBankAccount().addBalance(balanceHistory.getAmount());
                                    }
                                    bankAccountRepository.save(balanceHistory.getBankAccount());
                                    balanceHistory.setPaid(true);
                                    balanceHistoryRepository.save(balanceHistory);
                                }
                        ));
    }

}
