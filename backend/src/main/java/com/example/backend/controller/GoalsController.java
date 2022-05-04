package com.example.backend.controller;

import com.example.backend.Repositories.GoalElementRepository;
import com.example.backend.Repositories.GoalRepository;
import com.example.backend.model.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/goals")
public class GoalsController {
    private final GoalRepository goalRepository;
    private final GoalElementRepository goalElementRepository;

    public GoalsController(GoalRepository goalRepository, GoalElementRepository goalElementRepository) {
        this.goalRepository = goalRepository;
        this.goalElementRepository = goalElementRepository;
    }

    @GetMapping
    public List<Goal> getAllGoals(){
        return goalRepository.findAll();
    }

}
