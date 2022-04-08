package com.example.backend.Repositories;

import com.example.backend.model.BankAccount;
import org.springframework.data.repository.CrudRepository;

public interface BankAccountRepository extends CrudRepository<BankAccount, Long> {
}
