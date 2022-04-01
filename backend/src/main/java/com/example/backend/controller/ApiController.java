package com.example.backend.controller;

import com.example.backend.model.TestUser;
import com.example.backend.model.TestUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ApiController {

    @Autowired
    private TestUserRepository userRepository;

    @GetMapping("/")
    public String save(@RequestParam(value = "name") String name,@RequestParam(value = "lastName") String lastName){

        if(name!= null && lastName!=null) {
            TestUser testUser = new TestUser();
            testUser.setName(name);
            testUser.setLastname(lastName);

            userRepository.save(testUser);

            System.out.println("dodano " + name);
        }
        return "dodano";
    }

}
