package com.sistemaProductos.SistemaProductos.controller;

import java.util.List;

import com.sistemaProductos.SistemaProductos.model.Usuario;
import com.sistemaProductos.SistemaProductos.service.UsuarioService;
import com.sistemaProductos.SistemaProductos.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMethod;

import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;

// Los controllers sirven para manejar las direcciones de URL

// indicamos que es una clase controlador
@RestController
public class UsuarioController {

  @Autowired
  private UsuarioService usuarioDao;

  @Autowired

  private JWTUtil jwtUtil;

  @RequestMapping(value = "/api/usuarios", method = RequestMethod.GET)
  public List<Usuario> getUsuarios(@RequestHeader(value = "Authorization") String token) {
    if (!validarToken(token)) {
      return null;
    }

    return usuarioDao.getUsuarios();
  }

  private boolean validarToken(String token) {
    String usuarioId = jwtUtil.getKey(token);
    return usuarioId != null;
  }

  @RequestMapping(value = "/api/usuarios", method = RequestMethod.POST)
  public void registrarUsuario(@RequestBody Usuario usuario) {
    Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
    String hash = argon2.hash(1, 1024, 1, usuario.getPassword().toCharArray());
    usuario.setPassword(hash);
    usuarioDao.registrar(usuario);
  }

  @RequestMapping(value = "/api/usuarios/{id}", method = RequestMethod.DELETE)
  public void eliminar(@RequestHeader(value = "Authorization") String token,
      @PathVariable Long id) {
    if (!validarToken(token)) {
      return;
    }
    usuarioDao.eliminar(id);
  }

}