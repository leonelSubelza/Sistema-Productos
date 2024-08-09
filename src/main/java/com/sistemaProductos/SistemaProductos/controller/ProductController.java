package com.sistemaProductos.SistemaProductos.controller;

import java.net.URI;
import java.util.Map;
import java.util.Optional;

import com.sistemaProductos.SistemaProductos.dto.ProductResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import com.sistemaProductos.SistemaProductos.model.Product;
import com.sistemaProductos.SistemaProductos.service.IProductService;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;


@RestController
@RequestMapping("/productos")
public class ProductController {

	@Autowired
	private IProductService productService;

	@Autowired
	private SimpMessagingTemplate simpMessagingTemplate;

	@GetMapping
	public ResponseEntity<Page<ProductResponseDTO>> findAll(
			@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "2") int size
	){
		Pageable pageable = PageRequest.of(page, size);
		return new ResponseEntity<>(this.productService.findAll(pageable), HttpStatus.OK);
	}

	@GetMapping("/search")
	public ResponseEntity<Page<ProductResponseDTO>> findByDinamicValues(
			@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "2") int size,
			@RequestParam Map<String, String> allParams) {

		Pageable pageable = PageRequest.of(page, size, Sort.by("id").ascending());
		Page<ProductResponseDTO> products = productService.searchProducts(allParams, pageable);

		return ResponseEntity.ok(products);
	}

	@GetMapping("/byProductType")
	public ResponseEntity<Page<ProductResponseDTO>> findAllByProductType(
			@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "2") int size,
			@RequestParam(defaultValue = "1") int productTypeId
	){
		Pageable pageable = PageRequest.of(page, size);
		return new ResponseEntity<>(this.productService.findAllByProductType((long)productTypeId,pageable), HttpStatus.OK);
	}

	@GetMapping("/byProductTypeAndGenero")
	public ResponseEntity<Page<ProductResponseDTO>> findAllByProductTypeAndGenero(
			@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "2") int size,
			@RequestParam(defaultValue = "1") int productTypeId,
			@RequestParam(defaultValue = "MASCULINO") String genero
	){
		Pageable pageable = PageRequest.of(page, size);
		return new ResponseEntity<>(this.productService.findByGeneroAndTipoProducto(
				genero,
				(long)productTypeId,
				pageable), HttpStatus.OK);
	}

	@GetMapping("/byProductTypeAndNombre")
	public ResponseEntity<Page<ProductResponseDTO>> findAllByProductTypeAndNombre(
			@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "2") int size,
			@RequestParam(defaultValue = "1") int productTypeId,
			@RequestParam String nombre
	){
		Pageable pageable = PageRequest.of(page, size);
		return new ResponseEntity<>(this.productService.findByNombreAndTipoProducto(
				nombre,
				(long)productTypeId,
				pageable), HttpStatus.OK);
	}

	//Se agrega responseEntity para manejar los codigos de error al crear un nuevo producto
	//Valid indica que se deben validar antes de procesar los datos recibidos dado que el nombre de producto
	//no puede ser null
	@PostMapping
	public ResponseEntity<Product> create(
			@Valid @ModelAttribute ProductResponseDTO product,
//			@RequestParam("tipoProducto.id") Long productTypeId,
			@RequestParam("imagenObj") Optional<MultipartFile> imageObj
	){
		Product productSaved = this.productService.create(product,imageObj);
		//Se guarda la ubicacion en la que se guarda el nuevo producto, ej: http://localhost:8080/123
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(productSaved.getId()).toUri();

		simpMessagingTemplate.convertAndSend("/topic/notification", "Refresh table");

		//Se devuelve el objeto creado con su ubicacion
		return ResponseEntity.created(location).body(productSaved);
	}
	
	@PutMapping
	public ResponseEntity<Object> update(
			@Valid @ModelAttribute ProductResponseDTO product,
			@RequestParam("imagenObj") Optional<MultipartFile> imageObj
	) {
		this.productService.update(product, imageObj);

		simpMessagingTemplate.convertAndSend("/topic/notification", "Refresh table");

		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Product> findById(@PathVariable("id") Long id) {
		return ResponseEntity.ok(this.productService.findById(id));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Object> delete(@PathVariable Long id) {
		this.productService.delete(id);
		simpMessagingTemplate.convertAndSend("/topic/notification", "Refresh table");
		return new ResponseEntity<>(HttpStatus.OK);
	}

}
