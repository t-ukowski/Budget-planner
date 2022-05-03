package com.example.backend.model;

import com.google.gson.annotations.Expose;
import org.hibernate.annotations.Type;

import javax.persistence.*;

@Entity
@Table(name = "goal_element")
public class GoalElement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Expose
    private long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "goal_id")
    private Goal goal;

    @Expose
    private double cost;

    @Expose
    private String goalElementName;

    @Type(type = "true_false")
    @Expose
    private boolean achieved;

    public boolean isAchieved() {
        return achieved;
    }

    public void setAchieved(boolean achieved) {
        this.achieved = achieved;
    }

    public GoalElement(String goalElementName, double cost, Goal goal) {
        this.goal = goal;
        this.cost = cost;
        this.goalElementName = goalElementName;
        this.achieved = false;
    }

    public GoalElement() {
    }

    public Goal getGoal() {
        return goal;
    }

    public void setGoal(Goal goal) {
        this.goal = goal;
    }

    public double getCost() {
        return cost;
    }

    public void setCost(double cost) {
        this.cost = cost;
    }

    public String getGoalElementName() {
        return goalElementName;
    }

    public void setGoalElementName(String goalElementName) {
        this.goalElementName = goalElementName;
    }

    @Override
    public String toString() {
        return "GoalElement{" +
                "id=" + id +
                ", cost=" + cost +
                ", goalElementName='" + goalElementName + '\'' +
                ", achieved=" + achieved +
                '}';
    }
}
