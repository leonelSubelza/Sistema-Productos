package com.sistemaProductos.SistemaProductos.repository;

import com.sistemaProductos.SistemaProductos.model.ProductType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.sistemaProductos.SistemaProductos.model.Product;

public interface IProductRepository extends JpaRepository<Product, Long>{
    Page<Product> findByTipoProducto(ProductType productType, Pageable pageable);



}
