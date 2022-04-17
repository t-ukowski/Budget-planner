package com.example.backend.model;

import com.google.gson.annotations.Expose;

import javax.persistence.*;
import java.sql.Date;
import java.util.Calendar;

@Entity
@Table(name = "balance_history")
public class BalanceHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Expose
    private long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "bankAccount_id", nullable = false)
    @Expose
    private BankAccount bankAccount;

    @Basic
    @Expose
    private java.sql.Date billingDate;

    @Basic
    private java.sql.Date endBillingDate;

    private int repeatInterval;

    @Expose
    private double amount;

    @Expose
    private String description;

    @Expose
    @Enumerated(EnumType.STRING)
    private ActionType type;

    @Expose
    private String recipient;

    @Transient
    private String accountName; // do not include it in the database

    public BalanceHistory(BankAccount bankAccount, Date billingDate, Date endBillingDate, int repeatInterval, double amount, String description, ActionType actionType, String recipient) {
        this.bankAccount = bankAccount;
        this.billingDate = billingDate;
        this.endBillingDate = endBillingDate;
        this.repeatInterval = repeatInterval;
        this.amount = amount;
        this.description = description;
        this.type = actionType;
        this.recipient = recipient;
    }

    public BalanceHistory() {
    }

    public BankAccount getBankAccount() {
        return bankAccount;
    }

    public void setBankAccount(BankAccount bankAccount) {
        this.bankAccount = bankAccount;
    }

    public Date getBillingDate() {
        return billingDate;
    }

    public void setBillingDate(Date startBillingDate) {
        this.billingDate = startBillingDate;
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

    public ActionType getType() {
        return type;
    }

    public void setType(ActionType type) {
        this.type = type;
    }

    public String getRecipient() {
        return recipient;
    }

    public void setRecipient(String recipient) {
        this.recipient = recipient;
    }

    public String getAccountName() {
        return accountName;
    }

    public void setAccountName(String accountName) {
        this.accountName = accountName;
    }

    public void addToStartBillingDate(){
        java.sql.Date logicalDate = this.billingDate;
        Calendar c = Calendar.getInstance();
        c.setTime(logicalDate);
        c.add(Calendar.DATE, this.repeatInterval);
        this.billingDate = new java.sql.Date(c.getTimeInMillis());
    }

    @Override
    public String toString() {
        return "BalanceHistory{" +
                "id=" + id +
                ", bankAccount=" + bankAccount.toString() +
                ", startBillingDate=" + billingDate +
                ", endBillingDate=" + endBillingDate +
                ", repeatInterval=" + repeatInterval +
                ", amount=" + amount +
                ", description='" + description + '\'' +
                ", type=" + type +
                ", recipient='" + recipient + '\'' +
                '}';
    }
}
