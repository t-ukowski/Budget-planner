package com.example.backend.Repositories;

import com.example.backend.model.BankAccount;
import com.example.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BankAccountRepository extends JpaRepository<BankAccount, Long> {
    @Query("select b from BankAccount b where b.user = ?1 and b.accountName = ?2")
    List<BankAccount> findBankAccountsByUserAndAccountName(User user, String accountName);

}
