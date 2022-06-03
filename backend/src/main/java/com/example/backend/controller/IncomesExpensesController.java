package com.example.backend.controller;

import com.example.backend.Repositories.BalanceHistoryRepository;
import com.example.backend.Repositories.BankAccountRepository;
import com.example.backend.Repositories.UserRepository;
import com.example.backend.model.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.sql.Date;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/incomes-expenses")
public class IncomesExpensesController {
    private final BalanceHistoryRepository balanceHistoryRepository;
    private final UserRepository userRepository;
    private final BankAccountRepository bankAccountRepository;

    public IncomesExpensesController(BalanceHistoryRepository balanceHistoryRepository, UserRepository userRepository, BankAccountRepository bankAccountRepository){
        this.balanceHistoryRepository = balanceHistoryRepository;
        this.userRepository = userRepository;
        this.bankAccountRepository = bankAccountRepository;
    }

    @GetMapping
    public List<BalanceHistory> getAllIncomesAndExpenses() {
        return balanceHistoryRepository.findAll();
    }

    @GetMapping("/{id}")
    public BalanceHistory getIncomeOrExpense(@PathVariable Long id) {
        return balanceHistoryRepository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping
    public ResponseEntity<?> createIncomeOrExpense(@RequestParam String accountName, @RequestParam String billingDate,
                                                   @RequestParam String endBillingDate, @RequestParam int repeatInterval,
                                                   @RequestParam TimePeriod timePeriod, @RequestParam double amount,
                                                   @RequestParam String description, @RequestParam ActionType type,
                                                   @RequestParam String recipient) throws URISyntaxException {
        BalanceHistory action = new BalanceHistory(accountName, billingDate, endBillingDate, repeatInterval, timePeriod, amount, description, type, recipient);
        User user = userRepository.findTopByOrderByIdAsc();
        List<BankAccount> userAccounts = bankAccountRepository.findBankAccountsByUserAndAccountName(user, action.getAccountName());
        BankAccount bankAccount = userAccounts.get(0);
        action.setBankAccount(bankAccount);
        BalanceHistory savedAction = balanceHistoryRepository.save(action);
        return ResponseEntity.created(new URI("/incomes-expenses/" + savedAction.getId())).body(savedAction);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateIncomeOrExpense(@PathVariable Long id, @RequestParam String accountName,
                                                   @RequestParam String billingDate, @RequestParam String endBillingDate,
                                                   @RequestParam int repeatInterval, @RequestParam TimePeriod timePeriod,
                                                   @RequestParam double amount, @RequestParam String description,
                                                   @RequestParam ActionType type, @RequestParam String recipient) {
        BalanceHistory currentAction = balanceHistoryRepository.findById(id).orElseThrow(RuntimeException::new);
        User user = userRepository.findTopByOrderByIdAsc();
        List<BankAccount> userAccounts = bankAccountRepository.findBankAccountsByUserAndAccountName(user, accountName);
        BankAccount bankAccount = userAccounts.get(0);
        currentAction.setAccountName(accountName);
        currentAction.setBankAccount(bankAccount);
        currentAction.setBillingDate(Date.valueOf(billingDate));
        currentAction.setEndBillingDate(Date.valueOf(endBillingDate));
        currentAction.setRepeatInterval(repeatInterval);
        currentAction.setTimePeriod(timePeriod);
        currentAction.setAmount(amount);
        currentAction.setDescription(description);
        currentAction.setType(type);
        currentAction.setRecipient(recipient);
        currentAction = balanceHistoryRepository.save(currentAction);
        return ResponseEntity.ok(currentAction);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteIncomeOrExpense(@PathVariable Long id) {
        balanceHistoryRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
