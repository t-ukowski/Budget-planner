package com.example.backend.Repositories;

import com.example.backend.model.User;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    @Query("select u from User u")
    List<User> findAll();

    User findTopByOrderByIdAsc();
}

