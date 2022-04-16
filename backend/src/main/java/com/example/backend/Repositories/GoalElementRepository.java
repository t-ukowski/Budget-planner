package com.example.backend.Repositories;

import com.example.backend.model.GoalElement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GoalElementRepository extends JpaRepository<GoalElement, Long> {
}
