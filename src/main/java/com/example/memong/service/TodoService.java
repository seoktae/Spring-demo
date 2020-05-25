package com.example.memong.service;

import com.example.memong.dto.TodoDto;
import com.example.memong.entity.Todo;
import com.example.memong.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TodoService {

    @Autowired
    private TodoRepository todoRepository;


    public Todo insert(TodoDto todo) {
        return todoRepository.save(todo.toEntity());
    }
}
