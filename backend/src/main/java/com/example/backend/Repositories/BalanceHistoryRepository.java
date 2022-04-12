package com.example.backend.Repositories;

import com.example.backend.model.BalanceHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BalanceHistoryRepository extends JpaRepository<BalanceHistory, Long> {
}
