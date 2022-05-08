package com.example.backend.Repositories;

import com.example.backend.model.Goal;
import com.example.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GoalRepository extends JpaRepository<Goal, Long> {
    Goal findGoalByGoalNameAndUser(String goalName, User user);
}
