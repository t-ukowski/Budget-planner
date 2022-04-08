package com.example.backend.model;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Table(name = "balance_history")
public class BalanceHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "bankAccount_id", nullable = false)
    private BankAccount bankAccount;

    @Basic
    private java.sql.Date startBillingDate;

    @Basic
    private java.sql.Date endBillingDate;

    private int repeatInterval;

    private double amount;

    private String description;

    public BalanceHistory(BankAccount bankAccount, Date startBillingDate, Date endBillingDate, int repeatInterval, double amount, String description) {
        this.bankAccount = bankAccount;
        this.startBillingDate = startBillingDate;
        this.endBillingDate = endBillingDate;
        this.repeatInterval = repeatInterval;
        this.amount = amount;
        this.description = description;
    }

    public BalanceHistory() {
    }

    public BankAccount getBankAccount() {
        return bankAccount;
    }

    public void setBankAccount(BankAccount bankAccount) {
        this.bankAccount = bankAccount;
    }

    public Date getStartBillingDate() {
        return startBillingDate;
    }

    public void setStartBillingDate(Date startBillingDate) {
        this.startBillingDate = startBillingDate;
    }

    public Date getEndBillingDate() {
        return endBillingDate;
    }

    public void setEndBillingDate(Date endBillingDate) {
        this.endBillingDate = endBillingDate;
    }

    public int getRepeatInterval() {
        return repeatInterval;
    }

    public void setRepeatInterval(int repeatInterval) {
        this.repeatInterval = repeatInterval;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
