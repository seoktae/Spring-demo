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
@Table(name = "todo")
@SequenceGenerator(
        name="SEQ_TODO_GEN",
        sequenceName="SEQ_TODO",
        initialValue = 1,
        allocationSize = 1
)
public class Todo extends BaseTimeEntity{

    @Id
    @Column(name = "seq")
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_TODO_GEN")
    private Long id;

    @Column(length = 300, nullable = false)
    private String content;

    @Column
    private LocalDate todoDate;

    @CreatedDate
    private LocalDateTime createDate;

    @Column
    private String userName;

    @Override
    public String toString() {
        return "Todo{" +
                "content='" + content + '\'' +
                ", todoDate=" + todoDate +
                ", userName='" + userName + '\'' +
                '}';
    }

    @Builder
    public Todo(Long id, String content, LocalDate todoDate, LocalDateTime createDate, String userName) {
        this.id = id;
        this.content = content;
        this.todoDate = todoDate;
        this.createDate = createDate;
        this.userName = userName;
    }
}
