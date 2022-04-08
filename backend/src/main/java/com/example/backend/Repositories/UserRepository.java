package com.example.backend.Repositories;

import com.example.backend.model.User;

import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long>{
}

