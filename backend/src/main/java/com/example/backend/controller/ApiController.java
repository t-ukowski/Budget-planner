package com.example.backend.controller;

import com.example.backend.Repositories.*;
import com.example.backend.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ApiController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BankAccountRepository bankAccountRepository;

    @Autowired
    BalanceHistoryRepository balanceHistoryRepository;

    @Autowired
    GoalRepository goalRepository;

    @Autowired
    GoalElementRepository goalElementRepository;


    @GetMapping("/")
    public String save(@RequestParam(value = "name") String name){

        User user = new User(name,"hehehaslo","test@gmail.com");

        userRepository.save(user);

        BankAccount bankAccount1 = new BankAccount("ING",1000.43, user);
        BankAccount bankAccount2 = new BankAccount("Mbank", 1200.99, user);

        bankAccountRepository.save(bankAccount1);
        bankAccountRepository.save(bankAccount2);

        balanceHistoryRepository.save(new BalanceHistory(bankAccount1, java.sql.Date.valueOf("2020-11-15"), java.sql.Date.valueOf("2022-11-15"),30,200.00,"fajna platnosc"));
        balanceHistoryRepository.save(new BalanceHistory(bankAccount1, java.sql.Date.valueOf("2021-11-15"), java.sql.Date.valueOf("2023-11-15"),30,230.00,"xdxdxxxdxdx"));

        Goal goal = new Goal("remont",user);

        goalRepository.save(goal);

        GoalElement goalElement1 = new GoalElement("podloga",2000,goal);
        GoalElement goalElement2 = new GoalElement("szafa",700,goal);

        goalElementRepository.save(goalElement1);
        goalElementRepository.save(goalElement2);

        return "dodano";
    }

}
