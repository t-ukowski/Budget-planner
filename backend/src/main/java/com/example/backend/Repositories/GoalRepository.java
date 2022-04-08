package com.example.backend.Repositories;

import com.example.backend.model.Goal;
import org.springframework.data.repository.CrudRepository;

public interface GoalRepository extends CrudRepository<Goal, Long> {
}
