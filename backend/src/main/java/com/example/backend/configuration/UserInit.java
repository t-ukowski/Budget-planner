package com.example.backend.configuration;

import com.example.backend.Repositories.UserRepository;
import com.example.backend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class UserInit {

    @Autowired
    private UserRepository userRepository;

    @PostConstruct
    private void initUser(){
        if(userRepository.findTopByOrderByIdAsc() == null){
            User user = new User();
            userRepository.save(user);
        }
    }
}
