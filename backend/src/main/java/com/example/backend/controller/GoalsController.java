package com.example.backend.controller;

import com.example.backend.Repositories.*;
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
    private final BankAccountRepository bankAccountRepository;
    private final BalanceHistoryRepository balanceHistoryRepository;

    public GoalsController(GoalRepository goalRepository, GoalElementRepository goalElementRepository, UserRepository userRepository, BankAccountRepository bankAccountRepository, BalanceHistoryRepository balanceHistoryRepository) {
        this.goalRepository = goalRepository;
        this.goalElementRepository = goalElementRepository;
        this.userRepository = userRepository;
        this.bankAccountRepository = bankAccountRepository;
        this.balanceHistoryRepository = balanceHistoryRepository;
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

    void tick(GoalElement goal, Long accountId){
        java.sql.Date action_date = new java.sql.Date(System.currentTimeMillis());
        BalanceHistory action = new BalanceHistory();
        BankAccount account = bankAccountRepository.getById(accountId);
        action.setPaid(true);
        action.setBankAccount(account);
        action.setAmount(goal.getCost());
        action.setBillingDate(action_date);
        action.setEndBillingDate(action_date);
        action.setRepeatInterval(0);
        if(goal.isAchieved()){
            action.setDescription("Zysk z anulowania celu: " + goal.getGoalElementName());
            action.setType(ActionType.Przychód);
            balanceHistoryRepository.save(action);
            account.setAccountBalance(account.getAccountBalance() + goal.getCost());
            bankAccountRepository.save(account);
            goal.setAchieved(false);
            goalElementRepository.save(goal);
        }
        else {
            action.setDescription("Opłata za osiągnięcie celu: " + goal.getGoalElementName());
            action.setType(ActionType.Wydatek);
            balanceHistoryRepository.save(action);
            account.setAccountBalance(account.getAccountBalance() - goal.getCost());
            bankAccountRepository.save(account);
            goal.setAchieved(true);
            goalElementRepository.save(goal);
        }
    }

    @PutMapping("/goalElement/tick/{id}/{accountId}")
    public ResponseEntity<?> tickGoalElement(@PathVariable Long id, @PathVariable Long accountId){
        User user = userRepository.findTopByOrderByIdAsc();
        GoalElement goal = goalElementRepository.getById(id);
        tick(goal, accountId);
        Goal g = goal.getGoal();
        checkTicks(g);
        return ResponseEntity.ok("GoalElement ticked");
    }

    @PutMapping("/tick/{id}/{accountId}")
    public ResponseEntity<?> tickGoal(@PathVariable Long id, @PathVariable Long accountId){
        User user = userRepository.findTopByOrderByIdAsc();
        Goal goal = goalRepository.getById(id);
        List<GoalElement> subgoals = goalElementRepository.findGoalElementsByGoal(goal);
        for(GoalElement subgoal: subgoals){
            if(! subgoal.isAchieved()) {
                tick(subgoal, accountId);
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
