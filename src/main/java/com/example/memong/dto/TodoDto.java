package com.example.memong.dto;

import com.example.memong.entity.Todo;
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
    private String content;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate todoDate;

    private LocalDateTime createDate;
    private String userName;

    public Todo toEntity(){
        Todo todo = Todo.builder()
                .id(id)
                .content(content)
                .todoDate(todoDate)
                .userName(userName)
                .build();
        return todo;
    }

    @Builder
    public TodoDto(Long id, String content, LocalDate todoDate, LocalDateTime createDate, String userName) {
        this.id = id;
        this.content = content;
        this.todoDate = todoDate;
        this.createDate = createDate;
        this.userName = userName;
    }
}
