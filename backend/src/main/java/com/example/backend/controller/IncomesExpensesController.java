package com.example.backend.controller;

import com.example.backend.Repositories.BalanceHistoryRepository;
import com.example.backend.model.BalanceHistory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/incomes-expenses")
public class IncomesExpensesController {
    private final BalanceHistoryRepository balanceHistoryRepository;

    public IncomesExpensesController(BalanceHistoryRepository balanceHistoryRepository){
        this.balanceHistoryRepository = balanceHistoryRepository;
    }

    @GetMapping
    public List<BalanceHistory> getAllIncomesAndExpenses() {
        return balanceHistoryRepository.findAll();
    }

    @GetMapping("/{id}")
    public BalanceHistory getIncomeOrExpense(@PathVariable Long id) {
        return balanceHistoryRepository.findById(id).orElseThrow(RuntimeException::new);
    }
}
