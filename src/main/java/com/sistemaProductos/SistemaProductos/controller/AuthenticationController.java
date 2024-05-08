package com.sistemaProductos.SistemaProductos.controller;

import com.sistemaProductos.SistemaProductos.model.Usuario;
import com.sistemaProductos.SistemaProductos.service.UsuarioService;
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
    private UsuarioService usuarioService;

    @PostMapping("/login")
    public ResponseEntity<Usuario> login(@RequestBody Usuario userRequest) {
        return new ResponseEntity<Usuario>(this.usuarioService.getUsuario(userRequest), HttpStatus.OK);
    }
}
