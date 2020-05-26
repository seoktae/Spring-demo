package com.example.memong.controller;

import com.example.memong.dto.TodoDto;
import com.example.memong.entity.Todo;
import com.example.memong.service.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
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

    @GetMapping("/list/{date}")
    public Iterable<Todo> list(
            @DateTimeFormat(pattern = "yyyy-MM-dd")
            @PathVariable("date") LocalDate date,
                               Principal principal) {
        return service.list(date, principal.getName());
    }

    @DeleteMapping("/delete/{id}")
    @Transactional
    public String delete(@PathVariable("id") Long id, Principal principal) {
        System.out.println(id);
        service.delete(id, principal);
        return "delete";
    }

}
