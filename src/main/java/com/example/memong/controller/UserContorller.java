package com.example.memong.controller;

import com.example.memong.entity.User;
import com.example.memong.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/user")
public class UserContorller {

    @Autowired
    private UserService service;

    @GetMapping("/login")
    public String login() {
        return "/user/login";
    }

    @GetMapping("/join")
    public String join() {
        return "/user/join";
    }

    @PostMapping("/join")
    public String join(User user) {
        service.creatUser(user);
        return "redirect:/";
    }

    @GetMapping("/idcheck/{id}")
    @ResponseBody
    public int idCheck(@PathVariable("id") String username) {
        return service.idCheck(username);
    }


}
