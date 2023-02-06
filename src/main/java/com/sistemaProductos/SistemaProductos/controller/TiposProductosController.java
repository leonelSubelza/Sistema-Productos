package com.sistemaProductos.SistemaProductos.controller;

import com.sistemaProductos.SistemaProductos.model.TiposProductos;
import com.sistemaProductos.SistemaProductos.service.ITiposProductosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
