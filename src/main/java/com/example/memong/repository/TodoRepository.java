package com.example.memong.repository;

import com.example.memong.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {

    Iterable<Todo> findByUserNameAndTodoDate(String userName, LocalDate todoDate);

    void deleteByIdAndUserName(Long id, String userName);

}
