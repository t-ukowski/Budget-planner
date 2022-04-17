package com.example.backend.controller;

import com.example.backend.Repositories.BalanceHistoryRepository;
import com.example.backend.Repositories.BankAccountRepository;
import com.example.backend.Repositories.UserRepository;
import com.example.backend.model.BalanceHistory;
import com.example.backend.model.BankAccount;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

@RestController
public class JsonApiController {

    private static final int CHART_INTERVAL = 7;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BankAccountRepository bankAccountRepository;

    @Autowired
    BalanceHistoryRepository balanceHistoryRepository;

    @GetMapping("/AccountsList")
    public String getBankAccounts(){
        Gson gsonBuilder = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        return gsonBuilder.toJson(userRepository.findTopByOrderByIdAsc().getBankAccountList());
    }

    @GetMapping("/TotalBalance")
    public double getTotalBalance(){
        return userRepository.findTopByOrderByIdAsc().getBankAccountList().stream().mapToDouble(BankAccount::getAccountBalance).sum();
    }


    @GetMapping("/BalanceOperations/{id}")
    public String getBalanceOperations(@PathVariable String id){
        java.sql.Date date = new java.sql.Date(Calendar.getInstance().getTime().getTime());
        Calendar c = Calendar.getInstance();
        c.setTime(date);
        c.add(Calendar.DATE, Integer.parseInt(id) * 7);
        java.sql.Date futureDate = new java.sql.Date(c.getTimeInMillis());

        List<BalanceHistory> balanceHistoryList = getBalanceHistoryForNextDays(futureDate);

//        userRepository.findTopByOrderByIdAsc().getBankAccountList()
//                .forEach(bankAccount -> bankAccount.getBalanceHistories().stream()
//                        .filter(balanceHistory -> balanceHistory.getEndBillingDate().after(date))
//                                .filter(balanceHistory -> balanceHistory.getRepeatInterval() != 0)
//                                    .filter(balanceHistory -> balanceHistory.getStartBillingDate().before(date))
//                                        .forEach(balanceHistory -> ));

//        userRepository.findTopByOrderByIdAsc().getBankAccountList()
//                .forEach(bankAccount -> bankAccount.getBalanceHistories().stream()
//                    .filter(balanceHistory -> balanceHistory.getEndBillingDate().after(date))
//                        .forEach(balanceHistoryList::add));

        //start billing date + id*7

//        balanceHistoryList.forEach(BalanceHistory::addToStartBillingDate);
//        balanceHistoryList.stream().filter(balanceHistory -> balanceHistory.getStartBillingDate())

        System.out.println(balanceHistoryList);

        Gson gsonBuilder = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().create();
        return gsonBuilder.toJson(balanceHistoryList);
    }


    private List<BalanceHistory>  getBalanceHistoryForNextDays(java.sql.Date startDate){

        Calendar c = Calendar.getInstance();
        c.setTime(startDate);
        c.add(Calendar.DATE, CHART_INTERVAL);
        java.sql.Date endDate = new java.sql.Date(c.getTimeInMillis());

        List<BalanceHistory> resultList = new ArrayList<>();
        List<BankAccount> bankAccountList = userRepository.findTopByOrderByIdAsc().getBankAccountList();

        bankAccountList.forEach(bankAccount -> bankAccount.getBalanceHistories().stream()
                .filter(balanceHistory -> balanceHistory.getEndBillingDate().after(startDate))
                        .filter(balanceHistory -> balanceHistory.getRepeatInterval() != 0)
                            .filter(balanceHistory -> balanceHistory.getStartBillingDate().before(startDate))
                                .forEach(balanceHistory -> {
                                            balanceHistory.addToStartBillingDate();
                                            if(balanceHistory.getStartBillingDate().after(startDate) && balanceHistory.getStartBillingDate().before(endDate)) {
                                                resultList.add(balanceHistory);
                                            }
                                        }
                                       ));

        bankAccountList.forEach(bankAccount -> bankAccount.getBalanceHistories().stream()
                .filter(balanceHistory -> balanceHistory.getRepeatInterval() == 0)
                .forEach(balanceHistory -> {
                            if(balanceHistory.getStartBillingDate().after(startDate) && balanceHistory.getStartBillingDate().before(endDate)) {
                                resultList.add(balanceHistory);
                            }
                        }
                ));


        return resultList;
    }


}
