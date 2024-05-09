package com.sistemaProductos.SistemaProductos.service;

import com.sistemaProductos.SistemaProductos.model.ProductType;

import java.util.List;

public interface IProductTypeService {

  public ProductType create(ProductType productType);

  public ProductType update(ProductType productType);

  public ProductType findById(Long id);

  public List<ProductType> findAll();

  public void deleteById(Long id);
}
