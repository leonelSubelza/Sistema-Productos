package com.sistemaProductos.SistemaProductos.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sistemaProductos.SistemaProductos.model.Producto;
import com.sistemaProductos.SistemaProductos.service.IProductoService;

@RestController
@RequestMapping("/productos")
public class ProductoController {

	@Autowired
	private IProductoService productoService;
	
	//Se agrega responseEntity para manejar los codigos de error al crear un nuevo producto
	@PostMapping
	public ResponseEntity<Producto> create(@RequestBody Producto producto) {
		return new ResponseEntity<>(this.productoService.create(producto),HttpStatus.CREATED);
	}

	
	@PutMapping
	public ResponseEntity<Object> update(@RequestBody Producto producto) {
		this.productoService.update(producto);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Producto> findById(@PathVariable("id") Integer id) {
		return new ResponseEntity<>(this.productoService.findById(id),HttpStatus.OK);
	}
	
	@GetMapping
	public ResponseEntity<List<Producto>> findAll(){
		return new ResponseEntity<>(this.productoService.findAll(), HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Object> delete(@PathVariable Integer id) {
		this.productoService.delete(id);
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
