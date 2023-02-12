package com.sistemaProductos.SistemaProductos.controller;

import java.net.URI;
import java.util.List;
import java.util.Optional;

import com.sistemaProductos.SistemaProductos.exception.ModelNotFoundException;
import com.sistemaProductos.SistemaProductos.model.TipoProducto;
import com.sistemaProductos.SistemaProductos.service.ITipoProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;

@CrossOrigin("*")
//@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/productos")
public class ProductoController {

	@Autowired
	private IProductoService productoService;

	@Autowired
	private ITipoProductoService tipoProductoService;

	@GetMapping
	public ResponseEntity<List<Producto>> findAll(){
		return new ResponseEntity<>(this.productoService.findAll(), HttpStatus.OK);
	}

	//Se agrega responseEntity para manejar los codigos de error al crear un nuevo producto
	//Valid indica que se deben validar antes de procesar los datos recibidos dado que el nombre de producto
	//no puede ser null
	@PostMapping
	public ResponseEntity<Producto> create(@Valid @RequestBody Producto producto) {
		//Se guarda el producto creado en una variable
		Producto productoGuardado = this.productoService.create(producto);
		//Se guarda la ubicacion en la que se guarda el nuevo producto, ej: http://localhost:8080/123
		URI ubicacion = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(productoGuardado.getId()).toUri();
		//Se devuelve el objeto creado con su ubicacion
		return ResponseEntity.created(ubicacion).body(productoGuardado);
		//return new ResponseEntity<>(this.productoService.create(producto), HttpStatus.CREATED);
	}
	
	@PutMapping
	public ResponseEntity<Object> update(@Valid @RequestBody Producto producto) {
		//Obtenemos el TipoProducto asociado al Producto
		Optional<TipoProducto> tipoProductoOptional = Optional.ofNullable(this.tipoProductoService.findById(producto.getTipoProducto().getId()));
		if(!tipoProductoOptional.isPresent()){
			//Si un producto no tiene asignado un tipo producto explota todo
			return ResponseEntity.unprocessableEntity().build();
		}

		Optional<Producto> productoOptional = Optional.ofNullable(this.productoService.findById(producto.getId()));
		if(!productoOptional.isPresent()){
			//Si el objeto no existe se retorna un codigo de error
			return ResponseEntity.unprocessableEntity().build();
		}
		producto.setTipoProducto(tipoProductoOptional.get());
		this.productoService.update(producto);
		//return ResponseEntity.noContent().build();
		return new ResponseEntity<>(HttpStatus.OK);
		//this.productoService.update(producto);
		//return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Producto> findById(@PathVariable("id") Integer id) {
		Optional<Producto> productoOptional = Optional.ofNullable(this.productoService.findById(id));
		if(!productoOptional.isPresent()){
			throw new ModelNotFoundException("El cliente no fue encontrado");
			//return ResponseEntity.unprocessableEntity().build();
		}
		return ResponseEntity.ok(productoOptional.get());
		/*
		Producto prod = this.productoService.findById(id);
		if(prod == null){
			throw new ModelNotFoundException("El cliente no fue encontrado");
		}
		return new ResponseEntity<>(prod,HttpStatus.OK);
		 */
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Object> delete(@PathVariable Integer id) {
		Optional<Producto> productoOptional = Optional.ofNullable(this.productoService.findById(id));
		if(!productoOptional.isPresent()){
			//Si el objeto no existe se retorna un codigo de error
			return ResponseEntity.unprocessableEntity().build();
		}
		this.productoService.delete(id);
		return ResponseEntity.noContent().build();

		/*
		if(this.productoService.findById(id) == null){
			throw new ModelNotFoundException("El producto que desea eliminar no existe");
		}
		this.productoService.delete(id);
		return new ResponseEntity<>(HttpStatus.OK);
		*/

	}
}
