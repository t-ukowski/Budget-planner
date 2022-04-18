package com.example.backend.controller;

import com.example.backend.Repositories.*;
import com.example.backend.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.time.Instant;
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
        balanceHistoryRepository.save(new BalanceHistory(bankAccount1, java.sql.Date.valueOf("2021-11-15"), java.sql.Date.valueOf("2023-11-15"),30,230.00,"xdxdxxxdxdx", ActionType.Wydatek, "brak"));

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


    @GetMapping("/addAccount")
    public String sendBankAccountCreationForm(Model model){
        model.addAttribute("bankAccount", new BankAccount());
        return "new_bank_account";
    }

    @PostMapping("/addAccount")
    public ResponseEntity processBankAccountCreationForm(@ModelAttribute BankAccount bankAccount){
        List<User> users = userRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
        User user = users.get(0); // to update when more users

        bankAccount.setUser(user);
        bankAccountRepository.save(bankAccount); //it also updates

        Date action_date = new Date(Instant.now().toEpochMilli());
        BalanceHistory account_change_log = new BalanceHistory(bankAccount,
                action_date,
                action_date,
                0,
                bankAccount.getAccountBalance(),
                "account creation/update",
                ActionType.Przychód,
                bankAccount.getUser().getName());
        balanceHistoryRepository.save(account_change_log);
        return new ResponseEntity(HttpStatus.CREATED);
    }

    @GetMapping("/deleteAccount")
    public String sendBankAccountDeletingForm(Model model){
        model.addAttribute("bankAccount", new BankAccount() );
        return "delete_account";
    }


    @PostMapping("/deleteAccount")
    public ResponseEntity processBankAccountDeletingForm(long id){
        BankAccount bankAccount = bankAccountRepository.findBankAccountsById(id).get(0);
        bankAccountRepository.deleteById(id);
        Date action_date = new Date(Instant.now().toEpochMilli());
        BalanceHistory account_change_log = new BalanceHistory(bankAccount,
                action_date,
                action_date,
                0,
                bankAccount.getAccountBalance(),
                "account deleting",
                ActionType.Wydatek,
                bankAccount.getUser().getName());
        balanceHistoryRepository.save(account_change_log);
        return new ResponseEntity(HttpStatus.CREATED);
    }

}
