package com.sistemaProductos.SistemaProductos.controller;

import com.sistemaProductos.SistemaProductos.dto.PageDetailsDTO;
import com.sistemaProductos.SistemaProductos.model.PageDetails;
import com.sistemaProductos.SistemaProductos.service.PageDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/pageDetails")
public class PageDetailsController {
    @Autowired
    private PageDetailsService pageDetailsService;

    @PostMapping
    public ResponseEntity<PageDetails> create(
            @Valid @ModelAttribute PageDetailsDTO pageDetailsDTO,
            @RequestParam("pageLogoImageParam") Optional<MultipartFile> pageLogoImageMF,
            @RequestParam("frontPageImageParam") Optional<MultipartFile> frontPageImageMF
    ){
        PageDetails pageDetailsSaved = this.pageDetailsService.create(pageDetailsDTO,pageLogoImageMF,frontPageImageMF);
        //Se guarda la ubicacion en la que se guarda el nuevo producto, ej: http://localhost:8080/123
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
                .buildAndExpand(pageDetailsSaved.getId()).toUri();

        //Se devuelve el objeto creado con su ubicacion
        return ResponseEntity.created(location).body(pageDetailsSaved);
    }

    @PutMapping
    public ResponseEntity<Object> update(
            @Valid @ModelAttribute PageDetails pageDetails,
            @RequestParam("pageLogoImageParam") Optional<MultipartFile> pageLogoImageMF,
            @RequestParam("frontPageImageParam") Optional<MultipartFile> frontPageImageMF
    ) {
        this.pageDetailsService.update(pageDetails,pageLogoImageMF,frontPageImageMF);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PageDetails> findById(@PathVariable("id") Long id) {
        return ResponseEntity.ok(this.pageDetailsService.findById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable Long id) {
        this.pageDetailsService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping()
    public ResponseEntity<List<PageDetails>> findAll() {
        return new ResponseEntity<>(this.pageDetailsService.readAll(), HttpStatus.OK);
    }
}
