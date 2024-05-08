package com.sistemaProductos.SistemaProductos.service;

import java.util.List;

import com.sistemaProductos.SistemaProductos.model.Producto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IProductoService {

	public Producto create(Producto producto);
	
	public Producto update(Producto producto);
	
	public Producto findById(Integer id);
	
	public Page<Producto> findAll(Pageable pageable);
	
	public void delete(Integer id);
	
}
