package com.example.backend.controller;

import com.example.backend.Repositories.GoalElementRepository;
import com.example.backend.Repositories.GoalRepository;
import com.example.backend.Repositories.UserRepository;
import com.example.backend.model.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/goals")
public class GoalsController {
    private final GoalRepository goalRepository;
    private final GoalElementRepository goalElementRepository;
    private final UserRepository userRepository;

    public GoalsController(GoalRepository goalRepository, GoalElementRepository goalElementRepository, UserRepository userRepository) {
        this.goalRepository = goalRepository;
        this.goalElementRepository = goalElementRepository;
        this.userRepository = userRepository;
    }

    @GetMapping
    public List<Goal> getAllGoals(){
        return goalRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<?> createGoalElement(@RequestParam String goalName, @RequestParam double cost, @RequestParam String goalElementName) throws URISyntaxException {
        User user = userRepository.findTopByOrderByIdAsc();
        Goal goal = goalRepository.findGoalByGoalNameAndUser(goalName,  user);
        if(goal == null){ // create new Goal if it does not exist
            goal = new Goal(goalName, user);
            goalRepository.save(goal);
        }

        GoalElement element = new GoalElement(goalElementName, cost, goal);
        GoalElement savedElement = goalElementRepository.save(element);
        return ResponseEntity.created(new URI("/goals/elements/" + savedElement.getId())).body(savedElement);
    }
}
