package com.sistemaProductos.SistemaProductos.service;

import com.sistemaProductos.SistemaProductos.dto.ProductResponseDTO;
import com.sistemaProductos.SistemaProductos.model.Product;
import com.sistemaProductos.SistemaProductos.model.ProductType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

public interface IProductService {

	public Product create(ProductResponseDTO product, Optional<MultipartFile> imageObj);

	public Page<ProductResponseDTO> findAll(Pageable pageable);

	public Page<ProductResponseDTO> findAllByProductType(Long productTypeId, Pageable pageable);

	public Page<ProductResponseDTO> findByGeneroAndTipoProducto(String genero,Long productTypeId,Pageable pageable);

	public Product update(ProductResponseDTO product, Optional<MultipartFile> imageObj);

	public void delete(Long id);

	public Product findById(Long id);

	
}
