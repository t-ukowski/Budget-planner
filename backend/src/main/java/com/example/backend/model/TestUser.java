package com.example.backend.model;

import javax.persistence.Access;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.*;

@Entity
@Table(name = "test_users")
public class TestUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;

    public TestUser(String name, String lastname) {
        this.name = name;
        this.lastname = lastname;
    }

    private String lastname;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public TestUser(){
    }

    @Column(name = "name")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Column(name = "lastname")
    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

}
