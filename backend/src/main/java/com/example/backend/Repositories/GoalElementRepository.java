package com.example.backend.Repositories;

import com.example.backend.model.Goal;
import com.example.backend.model.GoalElement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface GoalElementRepository extends JpaRepository<GoalElement, Long> {

    @Query("select g from GoalElement g where g.goal = ?1")
    List<GoalElement> findGoalElementsByGoal( Goal goal);
}
