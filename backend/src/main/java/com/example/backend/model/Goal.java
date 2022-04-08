package com.example.backend.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "goal")
public class Goal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String goalName;

    @OneToMany(mappedBy = "goal", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<GoalElement> goalElementList;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public Goal(String goalName, User user) {
        this.goalName = goalName;
        this.user = user;
    }

    public Goal() {
    }

    public String getGoalName() {
        return goalName;
    }

    public void setGoalName(String goalName) {
        this.goalName = goalName;
    }

    public List<GoalElement> getGoalElementList() {
        return goalElementList;
    }

    public void setGoalElementList(List<GoalElement> goalElementList) {
        this.goalElementList = goalElementList;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
