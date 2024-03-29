package com.sistemaProductos.SistemaProductos.controller;

import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

import com.sistemaProductos.SistemaProductos.exception.ModelNotFoundException;
import com.sistemaProductos.SistemaProductos.model.TipoProducto;
import com.sistemaProductos.SistemaProductos.service.ITipoProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import com.sistemaProductos.SistemaProductos.model.Producto;
import com.sistemaProductos.SistemaProductos.service.IProductoService;
import org.springframework.web.multipart.MultipartFile;
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


	@Autowired
	private SimpMessagingTemplate simpMessagingTemplate;

	@GetMapping
	public ResponseEntity<List<Producto>> findAll(){
		return new ResponseEntity<>(this.productoService.findAll(), HttpStatus.OK);
	}

	//Se agrega responseEntity para manejar los codigos de error al crear un nuevo producto
	//Valid indica que se deben validar antes de procesar los datos recibidos dado que el nombre de producto
	//no puede ser null
	@PostMapping
	public ResponseEntity<Producto> create(
			@Valid @ModelAttribute Producto producto,
			@RequestParam("tipoProducto.id") Long tipoProductoId,
			@RequestParam("imagenObj") Optional<MultipartFile> imagenObj){
		//Producto producto = new ObjectMapper().readValue(productoJson, Producto.class);

		TipoProducto tipoProducto = this.tipoProductoService.findById(tipoProductoId);

		producto.setTipoProducto(tipoProducto);
		if(imagenObj.isPresent()){
			guardarImagen(producto,imagenObj.get());
		}

		//Se guarda el producto creado en una variable
		Producto productoGuardado = this.productoService.create(producto);
		//Se guarda la ubicacion en la que se guarda el nuevo producto, ej: http://localhost:8080/123
		URI ubicacion = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(productoGuardado.getId()).toUri();

		simpMessagingTemplate.convertAndSend("/topic/notification", "Refresh table");

		//Se devuelve el objeto creado con su ubicacion
		return ResponseEntity.created(ubicacion).body(productoGuardado);
	}
	
	@PutMapping
	public ResponseEntity<Object> update(
			@Valid @ModelAttribute Producto producto,
			@RequestParam("tipoProducto.id") Long tipoProductoId,
			@RequestParam("imagenObj") Optional<MultipartFile> imagenObj) {

		Optional<Producto> productoOptional = Optional.ofNullable(this.productoService.findById(producto.getId()));
		if(!productoOptional.isPresent()){
			//Si el objeto no existe se retorna un codigo de error
			return ResponseEntity.unprocessableEntity().build();
		}
		if(imagenObj.isPresent()){
			guardarImagen(producto,imagenObj.get());
		}else{
			producto.setImagen(producto.getImagen());
		}
		this.productoService.update(producto);

		simpMessagingTemplate.convertAndSend("/topic/notification", "Refresh table");

		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Producto> findById(@PathVariable("id") Integer id) {
		Optional<Producto> productoOptional = Optional.ofNullable(this.productoService.findById(id));
		if(!productoOptional.isPresent()){
			throw new ModelNotFoundException("El cliente no fue encontrado");
		}
		return ResponseEntity.ok(productoOptional.get());
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Object> delete(@PathVariable Integer id) {
		Optional<Producto> productoOptional = Optional.ofNullable(this.productoService.findById(id));
		if(!productoOptional.isPresent()){
			//Si el objeto no existe se retorna un codigo de error
			return ResponseEntity.unprocessableEntity().build();
		}
		this.productoService.delete(id);
		simpMessagingTemplate.convertAndSend("/topic/notification", "Refresh table");
		return ResponseEntity.noContent().build();
	}

	public void guardarImagen(Producto producto,MultipartFile imagenObj){
		String currentDirectory = System.getProperty("user.dir").replace( "\\" , "/");
		File directorio = new File(currentDirectory+"/src/main/resources/static/images");
		if (!directorio.exists()) {
			if (directorio.mkdirs()) {
				System.out.println("Directorio creado");
			}
		}
		Path directorioImagenes= Paths.get("src//main//resources//static/images");
		String rutaAbsoluta = directorioImagenes.toFile().getAbsolutePath();
		try{
			byte[] bytesImg = imagenObj.getBytes();
			Path rutaCompleta = Paths.get(rutaAbsoluta+"//"+imagenObj.getOriginalFilename());
			Files.write(rutaCompleta,bytesImg);
			producto.setImagen(imagenObj.getOriginalFilename());
		}catch (IOException e){
			e.printStackTrace();
		}
	}

}
