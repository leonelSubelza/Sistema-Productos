package com.sistemaProductos.SistemaProductos.controller;

import com.sistemaProductos.SistemaProductos.exception.ModelNotFoundException;
import com.sistemaProductos.SistemaProductos.model.Producto;
import com.sistemaProductos.SistemaProductos.model.TipoProducto;
import com.sistemaProductos.SistemaProductos.service.ITipoProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/tiposProductos")
public class TipoProductoController {

  @Autowired
  private ITipoProductoService tipoProductoService;

  @Autowired
  private SimpMessagingTemplate simpMessagingTemplate;

  @GetMapping
  public ResponseEntity<List<TipoProducto>> findAll() {
    return new ResponseEntity<>(this.tipoProductoService.findAll(), HttpStatus.OK);
  }

  @PutMapping
  public ResponseEntity<Object> update(@Valid @ModelAttribute TipoProducto tipoProducto) {
    this.tipoProductoService.update(tipoProducto);
    simpMessagingTemplate.convertAndSend("/topic/notification", "Refresh table");
    return new ResponseEntity<>(HttpStatus.OK);
  }

  @PostMapping
  public ResponseEntity<TipoProducto> create(@Valid @ModelAttribute TipoProducto tipoProd) {
    TipoProducto tipoProducto = this.tipoProductoService.create(tipoProd);
    simpMessagingTemplate.convertAndSend("/topic/notification", "Refresh table");
    return new ResponseEntity<>(tipoProducto, HttpStatus.CREATED);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Object> delete(@PathVariable Long id) {
    if (this.tipoProductoService.findById(id) == null) {
      throw new ModelNotFoundException("El tipo de prod que desea eliminar no existe");
    }
    this.tipoProductoService.deleteTipoProd(id);
    simpMessagingTemplate.convertAndSend("/topic/notification", "Refresh table");
    return new ResponseEntity<>(HttpStatus.OK);
  }

}
