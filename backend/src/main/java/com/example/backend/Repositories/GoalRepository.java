package com.example.backend.Repositories;

import com.example.backend.model.Goal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GoalRepository extends JpaRepository<Goal, Long> {
}
