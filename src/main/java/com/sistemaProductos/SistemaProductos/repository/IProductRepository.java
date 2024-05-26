package com.sistemaProductos.SistemaProductos.repository;

import com.sistemaProductos.SistemaProductos.model.ProductType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.sistemaProductos.SistemaProductos.model.Product;
import org.springframework.data.jpa.repository.Query;

public interface IProductRepository extends JpaRepository<Product, Long>{
    Page<Product> findByTipoProducto(ProductType productType, Pageable pageable);

//    @Query("SELECT p FROM Product p WHERE p.genero = :genero AND p.tipoProducto = :tipoProducto")
    Page<Product> findByGeneroAndTipoProducto(String genero, ProductType tipoProducto, Pageable pageable);

    Page<Product> findByNombreAndTipoProducto(String nombre, ProductType tipoProducto, Pageable pageable);

}
