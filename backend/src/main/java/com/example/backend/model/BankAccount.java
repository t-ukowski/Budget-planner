package com.example.backend.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "bank_accounts")
public class BankAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    public double getAccountBalance() {
        return accountBalance;
    }

    public void setAccountBalance(double accountBalance) {
        this.accountBalance = accountBalance;
    }

    private String accountName;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private double accountBalance;

    @OneToMany(mappedBy = "bankAccount", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<BalanceHistory> balanceHistories;

    public BankAccount() {
    }

    public BankAccount(String accountName, double accountBalance, User user) {
        this.accountName = accountName;
        this.user = user;
        this.accountBalance = accountBalance;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getAccountName() {
        return accountName;
    }

    public void setAccountName(String accountName) {
        this.accountName = accountName;
    }

    @Override
    public String toString() {
        return "BankAccount{" +
                "id=" + id +
                ", accountName='" + accountName + '\'' +
                ", user=" + user.getId() +
                ", accountBalance=" + accountBalance +
                '}';
    }
}
