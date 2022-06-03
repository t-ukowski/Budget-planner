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


    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteGoal(@PathVariable Long id){
        User user = userRepository.findTopByOrderByIdAsc();
        Goal goal = goalRepository.getById(id);
        goalRepository.deleteById(id);
        List<GoalElement> to_delete = goalElementRepository.findGoalElementsByGoal(goal);
        for(GoalElement subgoal: to_delete){
            goalElementRepository.deleteById(subgoal.getId());
        }
        return ResponseEntity.ok().build();
    }


    @PutMapping("/{id}")
    public ResponseEntity<?> updateGoal(@PathVariable Long id, @RequestParam String goalName){
        User user = userRepository.findTopByOrderByIdAsc();
        Goal goal = goalRepository.getById(id);
        goal.setGoalName(goalName);
        goal.setUser(user);
        goalRepository.save(goal);
        return ResponseEntity.ok(goal.getGoalName());
    }


    private void checkTicks(Goal g){
        List<GoalElement> subgoals = goalElementRepository.findGoalElementsByGoal(g);
        boolean flag = true;
        for (GoalElement subgoal: subgoals){
            if(! subgoal.isAchieved()){
                flag = false;
                break;
            }
        }

        // tu po ukońcczeniu ostatniego podcelu wywalamy cel z bazy
        // troszkę kontrowersyjne, ale powinno działać

        if(flag){
            goalRepository.delete(g);
            List<GoalElement> to_delete = goalElementRepository.findGoalElementsByGoal(g);
            for(GoalElement subgoal: to_delete){
                goalElementRepository.deleteById(subgoal.getId());
            }
        }
    }

    void tick(GoalElement goal){
        if(goal.isAchieved()){
            goal.setAchieved(false);
            goalElementRepository.save(goal);
        }
        else {
            goal.setAchieved(true);
            goalElementRepository.save(goal);
        }
    }

    @PutMapping("/goalElement/tick/{id}")
    public ResponseEntity<?> tickGoalElement(@PathVariable Long id){
        User user = userRepository.findTopByOrderByIdAsc();
        GoalElement goal = goalElementRepository.getById(id);
        tick(goal);
        Goal g = goal.getGoal();
        checkTicks(g);
        return ResponseEntity.ok("GoalElement ticked");
    }

    @PutMapping("/tick/{id}")
    public ResponseEntity<?> tickGoal(@PathVariable Long id){
        User user = userRepository.findTopByOrderByIdAsc();
        Goal goal = goalRepository.getById(id);
        List<GoalElement> subgoals = goalElementRepository.findGoalElementsByGoal(goal);
        for(GoalElement subgoal: subgoals){
            if(! subgoal.isAchieved()) {
                tick(subgoal);
            }
        }
        goalRepository.delete(goal);
        List<GoalElement> to_delete = goalElementRepository.findGoalElementsByGoal(goal);
        for(GoalElement subgoal: to_delete){
            goalElementRepository.deleteById(subgoal.getId());
        }
        return ResponseEntity.ok("Goal ticked and destroyed");
    }
}
