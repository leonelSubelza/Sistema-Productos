package com.sistemaProductos.SistemaProductos.controller;

import com.sistemaProductos.SistemaProductos.exception.ModelNotFoundException;
import com.sistemaProductos.SistemaProductos.model.TiposProductos;
import com.sistemaProductos.SistemaProductos.service.ITiposProductosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/tiposProductos")
public class TiposProductosController {

    @Autowired
    private ITiposProductosService tiposProductosService;

    @GetMapping
    public ResponseEntity<List<TiposProductos>> findAll(){
        return new ResponseEntity<>(this.tiposProductosService.findAll(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<TiposProductos> create(@RequestBody TiposProductos tipoProd){
        return new ResponseEntity<>(this.tiposProductosService.create(tipoProd), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable Long id) {
        if(this.tiposProductosService.findById(id) == null){
            throw new ModelNotFoundException("El tipo de prod que desea eliminar no existe");
        }
        this.tiposProductosService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
