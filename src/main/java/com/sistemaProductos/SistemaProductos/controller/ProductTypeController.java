package com.sistemaProductos.SistemaProductos.controller;

import com.sistemaProductos.SistemaProductos.exception.ModelNotFoundException;
import com.sistemaProductos.SistemaProductos.model.ProductType;
import com.sistemaProductos.SistemaProductos.service.IProductTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/tiposProductos")
public class ProductTypeController {

  @Autowired
  private IProductTypeService productTypeService;

/*  @Autowired
  private SimpMessagingTemplate simpMessagingTemplate;*/

  @GetMapping("/paginated")
  public ResponseEntity<Page<ProductType>> findAll(
          @RequestParam(defaultValue = "0") int page,
          @RequestParam(defaultValue = "2") int size
  ) {
    Pageable pageable = PageRequest.of(page, size);
    return new ResponseEntity<>(this.productTypeService.findAll(pageable), HttpStatus.OK);
  }

  @GetMapping
  public ResponseEntity<List<ProductType>> readAll() {
    return new ResponseEntity<>(this.productTypeService.readAll(), HttpStatus.OK);
  }

  @PutMapping
  public ResponseEntity<Object> update(
          @Valid @ModelAttribute ProductType tipoProd,
          @RequestParam("imagenObj") Optional<MultipartFile> imageObj
  ) {
    this.productTypeService.update(tipoProd,imageObj);
//    simpMessagingTemplate.convertAndSend("/topic/notification", "Refresh table");
    return new ResponseEntity<>(HttpStatus.OK);
  }

  /*
  *    @Valid @ModelAttribute PageDetailsDTO pageDetailsDTO,
            @RequestParam("imagenObj") Optional<MultipartFile> imageObj
  * */

  @PostMapping
  public ResponseEntity<ProductType> create(
          @Valid @ModelAttribute ProductType tipoProd,
          @RequestParam("imagenObj") Optional<MultipartFile> imageObj
  ) {
    ProductType productTypeCreated = this.productTypeService.create(tipoProd,imageObj);
//    simpMessagingTemplate.convertAndSend("/topic/notification", "Refresh table");
    return new ResponseEntity<>(productTypeCreated, HttpStatus.CREATED);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Object> delete(@PathVariable Long id) {
    if (this.productTypeService.findById(id) == null) {
      throw new ModelNotFoundException("El tipo de prod que desea eliminar no existe");
    }
    this.productTypeService.deleteById(id);
//    simpMessagingTemplate.convertAndSend("/topic/notification", "Refresh table");
    return new ResponseEntity<>(HttpStatus.OK);
  }

}
