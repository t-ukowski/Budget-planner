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
import org.springframework.web.bind.annotation.RequestParam;
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
    public String getBankAccounts() {
        Gson gsonBuilder = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().serializeNulls().create();
        return gsonBuilder.toJson(userRepository.findTopByOrderByIdAsc().getBankAccountList());
    }

    @GetMapping("/TotalBalance")
    public double getTotalBalance() {
        return userRepository.findTopByOrderByIdAsc().getBankAccountList().stream().mapToDouble(BankAccount::getAccountBalance).sum();
    }


    @GetMapping("/BalanceOperations")
    public String getBalanceOperations(@RequestParam(value = "page") int page) {
        java.sql.Date currentDate = new java.sql.Date(Calendar.getInstance().getTime().getTime());
        updateRepetitiveTransaction(currentDate);

        Calendar c = Calendar.getInstance();
        c.setTime(currentDate);
        c.add(Calendar.DATE, page * CHART_INTERVAL);
        java.sql.Date futureDate = new java.sql.Date(c.getTimeInMillis());

        List<BalanceHistory> balanceHistoryList = getBalanceHistoryForNextDays(futureDate);

        Gson gsonBuilder = new GsonBuilder().excludeFieldsWithoutExposeAnnotation().serializeNulls().create();
        return gsonBuilder.toJson(balanceHistoryList);
    }


    private List<BalanceHistory> getBalanceHistoryForNextDays(java.sql.Date startDate) {

        Calendar c = Calendar.getInstance();
        c.setTime(startDate);
        c.add(Calendar.DATE, CHART_INTERVAL);
        java.sql.Date endDate = new java.sql.Date(c.getTimeInMillis());

        List<BalanceHistory> resultList = new ArrayList<>();
        List<BankAccount> bankAccountList = userRepository.findTopByOrderByIdAsc().getBankAccountList();


        bankAccountList.forEach(bankAccount -> bankAccount.getBalanceHistories().stream()
                .filter(balanceHistory -> balanceHistory.getRepeatInterval() != 0)
                .filter(balanceHistory -> balanceHistory.getEndBillingDate().after(startDate))
                .filter(balanceHistory -> balanceHistory.getBillingDate().before(startDate))
                .forEach(balanceHistory -> {
                            while (balanceHistory.getBillingDate().before(startDate)) {
                                balanceHistory.addToStartBillingDate();
                            }
                        }
                ));

        bankAccountList.forEach(bankAccount -> bankAccount.getBalanceHistories()
                .forEach(balanceHistory -> {
                            if (balanceHistory.getBillingDate().after(startDate) && balanceHistory.getBillingDate().before(endDate)) {
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
