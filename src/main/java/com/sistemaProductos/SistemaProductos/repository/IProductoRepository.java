package com.sistemaProductos.SistemaProductos.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.sistemaProductos.SistemaProductos.model.Producto;

public interface IProductoRepository extends JpaRepository<Producto, Integer>{
}
