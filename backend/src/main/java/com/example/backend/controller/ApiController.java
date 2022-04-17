package com.example.backend.controller;

import com.example.backend.Repositories.*;
import com.example.backend.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Controller
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

        balanceHistoryRepository.save(new BalanceHistory(bankAccount1, java.sql.Date.valueOf("2020-11-15"), java.sql.Date.valueOf("2022-11-15"),30,200.00,"fajna platnosc", ActionType.Przychód, "Netflix"));
        balanceHistoryRepository.save(new BalanceHistory(bankAccount1, java.sql.Date.valueOf("2021-03-03"), java.sql.Date.valueOf("2023-11-15"),30,10.00,"xdxdxxxdxdx", ActionType.Wydatek, "brak"));
        balanceHistoryRepository.save(new BalanceHistory(bankAccount2, java.sql.Date.valueOf("2021-02-22"), java.sql.Date.valueOf("2023-11-15"),31,120.00,"platnosc 3", ActionType.Wydatek, "brak"));

        Goal goal = new Goal("remont",user);

        goalRepository.save(goal);

        GoalElement goalElement1 = new GoalElement("podloga",2000,goal);
        GoalElement goalElement2 = new GoalElement("szafa",700,goal);

        goalElementRepository.save(goalElement1);
        goalElementRepository.save(goalElement2);

        return "dodano_wydatek";
    }

    @GetMapping("/addIncome")
    public String sendIncomeExpensesForm(Model model){
        ActionType[] types = ActionType.values();
        model.addAttribute("types", types);

        User user = userRepository.findTopByOrderByIdAsc();
        ArrayList<BankAccount> accounts = new ArrayList<>(userRepository.findTopByOrderByIdAsc().getBankAccountList());
        model.addAttribute("accounts", accounts);

        model.addAttribute("balanceHistory", new BalanceHistory());
        return "new_income_expense";
    }

    @PostMapping("/addIncome")
    public ResponseEntity processIncomeExpenseForm(@ModelAttribute BalanceHistory balanceHistory){
        User user = userRepository.findTopByOrderByIdAsc();

        List<BankAccount> userAccounts = bankAccountRepository.findBankAccountsByUserAndAccountName(user, balanceHistory.getAccountName());
        BankAccount bankAccount = userAccounts.get(0);
        balanceHistory.setBankAccount(bankAccount);

        balanceHistoryRepository.save(balanceHistory);
        return new ResponseEntity(HttpStatus.CREATED);
    }

}
