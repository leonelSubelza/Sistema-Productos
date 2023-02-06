package com.sistemaProductos.SistemaProductos.repository;

import com.sistemaProductos.SistemaProductos.model.TiposProductos;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ITiposProductosRepository extends JpaRepository<TiposProductos,Long> {
}
