package com.sistemaProductos.SistemaProductos.repository;

import com.sistemaProductos.SistemaProductos.model.ProductType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.sistemaProductos.SistemaProductos.model.Product;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {
    Page<Product> findByTipoProducto(ProductType productType, Pageable pageable);

//    @Query("SELECT p FROM Product p WHERE p.genero = :genero AND p.tipoProducto = :tipoProducto")
    Page<Product> findByGeneroAndTipoProducto(String genero, ProductType tipoProducto, Pageable pageable);

    @Query("SELECT p FROM Product p WHERE p.nombre LIKE %:nombre% AND p.tipoProducto = :tipoProducto")
    Page<Product> findByNombreAndTipoProducto(@Param("nombre") String nombre,
                                              @Param("tipoProducto") ProductType tipoProducto,
                                              Pageable pageable);
}
