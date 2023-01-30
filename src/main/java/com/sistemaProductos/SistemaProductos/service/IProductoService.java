package com.sistemaProductos.SistemaProductos.service;

import java.util.List;

import com.sistemaProductos.SistemaProductos.model.Producto;

public interface IProductoService {

	public Producto create(Producto producto);
	
	public Producto update(Producto producto);
	
	public Producto findById(Integer id);
	
	public List<Producto> findAll();
	
	public void delete(Integer id);
	
}
