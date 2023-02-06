package com.sistemaProductos.SistemaProductos.service;

import com.sistemaProductos.SistemaProductos.model.Producto;
import com.sistemaProductos.SistemaProductos.model.TiposProductos;

import java.util.List;

public interface ITiposProductosService {

    public TiposProductos create(TiposProductos tiposProductos);

    public TiposProductos update(TiposProductos tiposProductos);

    public TiposProductos findById(Long id);

    public List<TiposProductos> findAll();

    public void delete(Long id);
}
