package com.example.backend.model;

import com.google.gson.annotations.Expose;

import java.sql.Date;

public class GoalRealization {
    @Expose
    private Goal goal;
    @Expose
    private Date date;

    public GoalRealization(Goal goal, Date date) {
        this.goal = goal;
        this.date = date;
    }

    public Goal getGoal() {
        return goal;
    }

    public void setGoal(Goal goal) {
        this.goal = goal;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

}
