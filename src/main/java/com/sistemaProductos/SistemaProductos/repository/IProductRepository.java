package com.sistemaProductos.SistemaProductos.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sistemaProductos.SistemaProductos.model.Product;

public interface IProductRepository extends JpaRepository<Product, Long>{
}
