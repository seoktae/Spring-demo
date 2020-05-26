package com.example.memong.controller;

import com.example.memong.dto.TodoDto;
import com.example.memong.entity.Todo;
import com.example.memong.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.time.LocalDate;

@RestController
public class TodoController {

    @Autowired
    private TodoService service;

    @PostMapping("/insert")
    public Todo insert(TodoDto todo, Principal principal) {
        todo.setUserName(principal.getName());
        return service.insert(todo);
    }

}
