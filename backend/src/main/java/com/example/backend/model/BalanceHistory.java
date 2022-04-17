package com.example.backend.model;

import com.google.gson.annotations.Expose;

import javax.persistence.*;
import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
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
    private java.sql.Date startBillingDate;

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

    private String recipient;

    @Transient
    private String accountName; // do not include it in the database

    @Transient
    private static final int daysPerSite = 7;

    public BalanceHistory(BankAccount bankAccount, Date startBillingDate, Date endBillingDate, int repeatInterval, double amount, String description, ActionType actionType, String recipient) {
        this.bankAccount = bankAccount;
        this.startBillingDate = startBillingDate;
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

    public boolean getFutureDate(int multiplier){
        java.sql.Date date = new java.sql.Date(Calendar.getInstance().getTime().getTime());

//        LocalDate currentdDate1 =  LocalDate.now();
//
//        if(this.startBillingDate.after(()){
//
//        }

        return true;
    }

    public void addToStartBillingDate(){
        java.sql.Date logicalDate = this.startBillingDate;
        Calendar c = Calendar.getInstance();
        c.setTime(logicalDate);
        c.add(Calendar.DATE, 1);
        java.sql.Date startDate= new java.sql.Date(c.getTimeInMillis());
        System.out.println(startDate);
//        LocalDateTime date = (LocalDateTime) this.startBillingDate;
//        LocalDateTime tomorrow = today.plusDays(1);


    }

    @Override
    public String toString() {
        return "BalanceHistory{" +
                "id=" + id +
                ", bankAccount=" + bankAccount.toString() +
                ", startBillingDate=" + startBillingDate +
                ", endBillingDate=" + endBillingDate +
                ", repeatInterval=" + repeatInterval +
                ", amount=" + amount +
                ", description='" + description + '\'' +
                ", type=" + type +
                ", recipient='" + recipient + '\'' +
                '}';
    }
}
