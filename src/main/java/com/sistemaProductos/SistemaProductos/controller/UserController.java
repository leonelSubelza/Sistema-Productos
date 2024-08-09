package com.sistemaProductos.SistemaProductos.controller;

import java.net.URI;
import java.util.List;

import com.sistemaProductos.SistemaProductos.dto.UserDTO;
import com.sistemaProductos.SistemaProductos.model.User;
import com.sistemaProductos.SistemaProductos.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.validation.Valid;

// Los controllers sirven para manejar las direcciones de URL

// indicamos que es una clase controlador
@RestController
@RequestMapping("/api/usuarios")
public class UserController {

  @Autowired
  private UserService userService;

  @GetMapping
  public ResponseEntity<List<User>> findAll() {
    return ResponseEntity.ok().body(userService.findAll());
  }

  @PostMapping
  public ResponseEntity<User> save(@Valid @RequestBody User usuario,
                                   UriComponentsBuilder uriComponentsBuilder) {
    User response = this.userService.save(usuario);
    //esta URL irá asociada en el encabezado de respuesta location
    URI url = uriComponentsBuilder.path("/topico/{id}").buildAndExpand(response.getId()).toUri();
    return ResponseEntity.created(url).body(response);
  }

  @DeleteMapping
  public ResponseEntity<String> deleteById(@PathVariable(value = "id") Long id) {
    this.userService.deleteById(id);
    return new ResponseEntity<>("Autor eliminado con éxito", HttpStatus.OK);
  }

  @PostMapping("/login")
  public ResponseEntity<User> login(@RequestBody @Valid UserDTO userDTO){
    return new ResponseEntity<User>(this.userService.getUser(userDTO), HttpStatus.OK);
  }

  @GetMapping("/{id}")
  public ResponseEntity<User> getById(@PathVariable(value = "id") Long id){
    return ResponseEntity.ok(this.userService.getById(id));
  }

}