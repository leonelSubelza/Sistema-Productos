package com.sistemaProductos.SistemaProductos.service;

import com.sistemaProductos.SistemaProductos.model.ProductType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface IProductTypeService {

  ProductType create(ProductType productType, Optional<MultipartFile> imageObj);

  ProductType update(ProductType productType,Optional<MultipartFile> imageObj);

  ProductType findById(Long id);

  Page<ProductType> findAll(Pageable pageable);
  List<ProductType> readAll();
  void deleteById(Long id);
}

