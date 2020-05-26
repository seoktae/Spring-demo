package com.example.memong.service;

import com.example.memong.dto.TodoDto;
import com.example.memong.entity.Todo;
import com.example.memong.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.time.LocalDate;

@Service
public class TodoService {

    @Autowired
    private TodoRepository todoRepository;


    public Todo insert(TodoDto todo) {
        return todoRepository.save(todo.toEntity());
    }

    public Iterable<Todo> list(LocalDate date, String name) {
        return todoRepository.findByUserNameAndTodoDate(name, date);
    }

    public void delete(Long id, Principal principal) {
        todoRepository.deleteByIdAndUserName(id, principal.getName());
    }
}
