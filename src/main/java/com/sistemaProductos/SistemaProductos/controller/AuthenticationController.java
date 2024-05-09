package com.sistemaProductos.SistemaProductos.controller;

import com.sistemaProductos.SistemaProductos.model.User;
import com.sistemaProductos.SistemaProductos.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User userRequest) {
        return new ResponseEntity<User>(this.userService.getUser(userRequest), HttpStatus.OK);
    }
}
