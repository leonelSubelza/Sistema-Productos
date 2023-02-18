package com.sistemaProductos.SistemaProductos.controller;

import com.sistemaProductos.SistemaProductos.exception.ModelNotFoundException;
import com.sistemaProductos.SistemaProductos.model.TipoProducto;
import com.sistemaProductos.SistemaProductos.service.ITipoProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/tiposProductos")
public class TipoProductoController {

  @Autowired
  private ITipoProductoService tipoProductoService;

  @GetMapping
  public ResponseEntity<List<TipoProducto>> findAll() {
    return new ResponseEntity<>(this.tipoProductoService.findAll(), HttpStatus.OK);
  }

  @PutMapping
  public ResponseEntity<Object> update(@RequestBody TipoProducto tipoProducto) {
    this.tipoProductoService.update(tipoProducto);
    return new ResponseEntity<>(HttpStatus.OK);
  }

  @PostMapping
  public ResponseEntity<TipoProducto> create(@RequestBody TipoProducto tipoProd) {
    return new ResponseEntity<>(this.tipoProductoService.create(tipoProd), HttpStatus.CREATED);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Object> delete(@PathVariable Long id) {
    if (this.tipoProductoService.findById(id) == null) {
      throw new ModelNotFoundException("El tipo de prod que desea eliminar no existe");
    }
    this.tipoProductoService.deleteTipoProd(id);
    return new ResponseEntity<>(HttpStatus.OK);
  }

}
