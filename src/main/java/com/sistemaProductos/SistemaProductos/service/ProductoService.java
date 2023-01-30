package com.sistemaProductos.SistemaProductos.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.sistemaProductos.SistemaProductos.model.Producto;
import com.sistemaProductos.SistemaProductos.repository.IProductoRepository;

public class ProductoService implements IProductoService{

	@Autowired
	private IProductoRepository productoRepo;
	
	@Override
	public Producto create(Producto producto) {
		return this.productoRepo.save(producto);
	}

	@Override
	public Producto update(Producto producto) {
		return this.productoRepo.save(producto);
	}

	@Override
	public Producto findById(Integer id) {
		Optional<Producto> prodOptional = this.productoRepo.findById(id);
		//Si el obj no es encontrado se retorna null
		return prodOptional.orElse(null);
	}

	@Override
	public List<Producto> findAll() {
		return this.productoRepo.findAll();
	}

	@Override
	public void delete(Integer id) {
		this.productoRepo.deleteById(id);
	}

}
