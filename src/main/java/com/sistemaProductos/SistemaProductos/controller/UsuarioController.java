package com.sistemaProductos.SistemaProductos.controller;

import java.net.URI;
import java.util.List;

import com.sistemaProductos.SistemaProductos.model.Usuario;
import com.sistemaProductos.SistemaProductos.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

// Los controllers sirven para manejar las direcciones de URL

// indicamos que es una clase controlador
@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

  @Autowired
  private UsuarioService usuarioService;

  @GetMapping
  public ResponseEntity<List<Usuario>> getUsuarios() {
    return ResponseEntity.ok().body(usuarioService.getUsuarios());
  }

  @PostMapping
  public ResponseEntity<Usuario> registrar(@RequestBody Usuario usuario,
                                                  UriComponentsBuilder uriComponentsBuilder) {
    Usuario response = this.usuarioService.registrar(usuario);
    //esta URL irá asociada en el encabezado de respuesta location
    URI url = uriComponentsBuilder.path("/topico/{id}").buildAndExpand(response.getId()).toUri();
    return ResponseEntity.created(url).body(response);
  }

  @DeleteMapping
  public ResponseEntity<String> eliminar(@PathVariable(value = "id") Long id) {
    this.usuarioService.eliminar(id);
    return new ResponseEntity<>("Autor eliminado con éxito", HttpStatus.OK);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Usuario> getById(@PathVariable(value = "id") Long id){
    return ResponseEntity.ok(this.usuarioService.obtenerPorId(id));
  }

}