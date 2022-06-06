package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.google.gson.annotations.Expose;
import org.hibernate.annotations.Type;

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
    @Expose
    private java.sql.Date endBillingDate;

    @Expose
    private int repeatInterval;

    @Expose
    @Enumerated(EnumType.STRING)
    private TimePeriod timePeriod;

    @Expose
    private double amount;

    @Expose
    private String description;

    @Expose
    @Enumerated(EnumType.STRING)
    private ActionType type;

    @Expose
    private String recipient;

    @Type(type = "true_false")
    @Expose
    private boolean paid;

    @Transient
    private String accountName; // do not include it in the database

    public BalanceHistory(String bankAccountName, String billingDate, String endBillingDate, int repeatInterval, TimePeriod timePeriod, double amount, String description, ActionType actionType, String recipient) {
        this.accountName = bankAccountName;
        this.billingDate = Date.valueOf(billingDate);
        this.endBillingDate = Date.valueOf(endBillingDate);
        this.repeatInterval = repeatInterval;
        this.timePeriod = timePeriod;
        this.amount = amount;
        this.description = description;
        this.type = actionType;
        this.recipient = recipient;
    }

    public BalanceHistory(BankAccount bankAccount, Date billingDate, Date endBillingDate, int repeatInterval, TimePeriod timePeriod, double amount, String description, ActionType actionType, String recipient) {
        this.bankAccount = bankAccount;
        this.billingDate = billingDate;
        this.endBillingDate = endBillingDate;
        this.repeatInterval = repeatInterval;
        this.timePeriod = timePeriod;
        this.amount = amount;
        this.description = description;
        this.type = actionType;
        this.recipient = recipient;
    }

    public BalanceHistory(BalanceHistory balanceHistoryCopy){
        this.id = balanceHistoryCopy.id;
        this.bankAccount = balanceHistoryCopy.bankAccount;
        this.billingDate = balanceHistoryCopy.billingDate;
        this.endBillingDate = balanceHistoryCopy.endBillingDate;
        this.repeatInterval = balanceHistoryCopy.repeatInterval;
        this.timePeriod = balanceHistoryCopy.timePeriod;
        this.amount = balanceHistoryCopy.amount;
        this.description = balanceHistoryCopy.description;
        this.type = balanceHistoryCopy.type;
        this.recipient = balanceHistoryCopy.recipient;
        this.paid = balanceHistoryCopy.paid;
    }

    public BalanceHistory() {
    }

    public boolean isPaid() {
        return paid;
    }

    public void setPaid(boolean paid) {
        this.paid = paid;
    }


    public long getId() {
        return id;
    }

    @JsonBackReference
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

    public void setTimePeriod(TimePeriod timePeriod){
        this.timePeriod = timePeriod;
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
        //c.add(Calendar.DATE, this.repeatInterval);
        switch(timePeriod){
            case dzień -> c.add(Calendar.DATE, this.repeatInterval);
            case tydzień -> c.add(Calendar.DATE, this.repeatInterval * 7);
            case miesiąc -> c.set(Calendar.MONTH, (c.get(Calendar.MONTH) + this.repeatInterval) % 12);
            case rok -> c.set(Calendar.YEAR, c.get(Calendar.YEAR) + this.repeatInterval);
        }
        this.billingDate = new java.sql.Date(c.getTimeInMillis());
    }
}
