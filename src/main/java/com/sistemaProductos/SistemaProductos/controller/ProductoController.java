package com.sistemaProductos.SistemaProductos.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
	
	
	@PostMapping
	public Producto create(@RequestBody Producto producto) {
		return this.productoService.create(producto);
	}

	
	@PutMapping
	public Producto update(@RequestBody Producto producto) {
		return this.productoService.update(producto);
	}
	
	@GetMapping("/{id}")
	public Producto findById(@PathVariable("id") Integer id) {
		return this.productoService.findById(id);
	}
	
	@GetMapping
	public List<Producto> findAll(){
		return this.productoService.findAll();
	}
	
	@DeleteMapping("/{id}")
	public void delete(@PathVariable Integer id) {
		this.productoService.delete(id);
	}
}
