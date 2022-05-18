package com.example.backend.controller;

import com.example.backend.Repositories.UserRepository;
import com.example.backend.model.User;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class UsersController {
    private final UserRepository userRepository;

    public UsersController(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @CrossOrigin
    @GetMapping("/users/top")
    public User getTopUser(){
        return userRepository.findTopByOrderByIdAsc();
    }

    @CrossOrigin
    @PutMapping("/users/top")
    public ResponseEntity<User> editTopUser(@RequestParam(required = false) String username,
                                      @RequestParam(required = false) String email){
        User topUser = userRepository.findTopByOrderByIdAsc();
        if(username != null) {
            topUser.setName(username);
        }

        if(email != null){
            topUser.setEmail(email);
        }

        topUser = userRepository.save(topUser);
        return ResponseEntity.ok(topUser);
    }

    @CrossOrigin
    @PutMapping("/users/{userId}")
    public ResponseEntity<User> editUser(@PathVariable Long userId, @RequestParam(required = false) String username,
                                      @RequestParam(required = false) String email){
        Optional<User> currentUserOpt = userRepository.findById(userId);
        if(currentUserOpt.isPresent()){
            User currentUser = currentUserOpt.get();

            if(username != null) {
                currentUser.setName(username);
            }

            if(email != null){
                currentUser.setEmail(email);
            }

            currentUser = userRepository.save(currentUser);
            return ResponseEntity.ok(currentUser);
        }

        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("users/{id}")
    public ResponseEntity<?> deleteIncomeOrExpense(@PathVariable Long id) {
        userRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
