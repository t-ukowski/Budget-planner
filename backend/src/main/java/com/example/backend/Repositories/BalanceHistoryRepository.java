package com.example.backend.Repositories;

import com.example.backend.model.BalanceHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BalanceHistoryRepository extends JpaRepository<BalanceHistory, Long> {

}