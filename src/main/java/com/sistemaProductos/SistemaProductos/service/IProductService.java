package com.sistemaProductos.SistemaProductos.service;

import com.sistemaProductos.SistemaProductos.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

public interface IProductService {

	public Product create(Product product, Long productTypeId, Optional<MultipartFile> imageObj);
	
	public Product update(Product product, Long productTypeId, Optional<MultipartFile> imageObj);
	
	public Product findById(Long id);
	
	public Page<Product> findAll(Pageable pageable);
	
	public void delete(Long id);
	
}
