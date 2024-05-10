package com.sistemaProductos.SistemaProductos.service;

import com.sistemaProductos.SistemaProductos.model.ProductType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface IProductTypeService {

  public ProductType create(ProductType productType);

  public ProductType update(ProductType productType);

  public ProductType findById(Long id);

  public Page<ProductType> findAll(Pageable pageable);
  public List<ProductType> readAll();
  public void deleteById(Long id);
}

