package com.example.memong.dto;

import com.example.memong.entity.Todo;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class TodoDto {

    private Long id;
    private String todo;

    @DateTimeFormat(pattern = "yyyyMMdd")
    private LocalDate todoDate;

    private LocalDateTime createDate;
    private String userName;

    public Todo toEntity(){
        Todo todo1 = Todo.builder()
                .id(id)
                .todo(todo)
                .todoDate(todoDate)
                .userName(userName)
                .build();
        return todo1;
    }

    @Builder
    public TodoDto(Long id, String todo, LocalDate todoDate, LocalDateTime createDate, String userName) {
        this.id = id;
        this.todo = todo;
        this.todoDate = todoDate;
        this.createDate = createDate;
        this.userName = userName;
    }
}
