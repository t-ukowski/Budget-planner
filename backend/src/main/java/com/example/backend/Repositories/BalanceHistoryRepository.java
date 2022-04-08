package com.example.backend.Repositories;

import com.example.backend.model.BalanceHistory;
import org.springframework.data.repository.CrudRepository;

public interface BalanceHistoryRepository extends CrudRepository<BalanceHistory, Long> {
}
