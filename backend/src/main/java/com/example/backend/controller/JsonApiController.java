package com.example.backend.controller;

import com.example.backend.Repositories.BalanceHistoryRepository;
import com.example.backend.Repositories.BankAccountRepository;
import com.example.backend.Repositories.UserRepository;
import com.example.backend.model.BalanceHistory;
import com.example.backend.model.BankAccount;
import com.example.backend.model.Goal;
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

@RestController
public class JsonApiController {

//    private static final int CHART_INTERVAL = 30;

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
        return userRepository.findTopByOrderByIdAsc().getBankAccountList().stream().mapToDouble(BankAccount::getAccountBalance).sum();
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
                            if(!flag.get()){
                                goalList.add(goal);
                            }
                        }
                );

        Gson gsonBuilder = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().serializeNulls().create();
        return gsonBuilder.toJson(goalList);
    }

    @CrossOrigin
    @GetMapping("/CompletedGoals")
    public String getCompletedGoals() {
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
                            if(flag.get()){
                                goalList.add(goal);
                            }
                        }
                );

        Gson gsonBuilder = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().serializeNulls().create();
        return gsonBuilder.toJson(goalList);
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
                                    resultList.add(balanceHistory);
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
                                    }
                                    balanceHistoryRepository.save(balanceHistory);
                                }
                        ));
    }

}
