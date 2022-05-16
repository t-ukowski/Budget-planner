package com.example.backend.controller;

import com.example.backend.Repositories.UserRepository;
import com.example.backend.model.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Optional;

@RestController
public class UsersController {
    private final UserRepository userRepository;

    public UsersController(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @CrossOrigin
    @PostMapping("/addUser")
    public ResponseEntity<?> createUser(@RequestParam String username, @RequestParam(required = false) String email) throws URISyntaxException {
        User user;
        if(email != null) {
            user = new User(username, email);
        }
        else{
            user = new User(username);
        }
        User savedUser = userRepository.save(user);
        return ResponseEntity.created(new URI("/users/" + savedUser.getId())).body(savedUser);
    }

    @CrossOrigin
    @PutMapping("/users/{userId}")
    public ResponseEntity<?> editUser(@PathVariable Long userId, @RequestParam(required = false) String username,
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
}
