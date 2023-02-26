package com.sistemaProductos.SistemaProductos.controller;


import com.sistemaProductos.SistemaProductos.model.Usuario;
import com.sistemaProductos.SistemaProductos.service.UsuarioService;
import com.sistemaProductos.SistemaProductos.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class AuthController {
    @Autowired
    private UsuarioService usuarioService;

    @Autowired

    private JWTUtil jwtUtil;

    @RequestMapping(value = "api/login", method = RequestMethod.POST)
    public String login(@RequestBody Usuario usuario) {
        Usuario usuarioLogueado = usuarioService.obtenerUsuarioPorCredenciales(usuario);

        if (usuarioLogueado != null) {

            // Con String.valueOf convierto Long a String
            String token = jwtUtil.create(String.valueOf(usuarioLogueado.getId()), usuarioLogueado.getEmail());

            return token;
        }
        return "FAIL";
    }
}
