package com.example.memong.entity;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 500, nullable = false)
    private String todo;

    @Column
    private LocalDate todoDate;

    @CreatedDate
    private LocalDateTime createDate;

    @Column
    private String userName;

    @Override
    public String toString() {
        return "Todo{" +
                "todo='" + todo + '\'' +
                ", todoDate=" + todoDate +
                ", userName='" + userName + '\'' +
                '}';
    }

    @Builder
    public Todo(Long id, String todo, LocalDate todoDate, LocalDateTime createDate, String userName) {
        this.id = id;
        this.todo = todo;
        this.todoDate = todoDate;
        this.createDate = createDate;
        this.userName = userName;
    }
}
