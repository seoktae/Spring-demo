package com.example.memong.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@ToString
@Table(name = "MEMBER")
public class User extends BaseTimeEntity{

    @Id
    @Column
    private String userName;

    @Column
    private String password;

    @CreatedDate
    private LocalDateTime createDate;




}
