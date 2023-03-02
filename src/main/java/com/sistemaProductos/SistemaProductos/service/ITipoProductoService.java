package com.sistemaProductos.SistemaProductos.service;

import com.sistemaProductos.SistemaProductos.model.TipoProducto;

import java.util.List;

public interface ITipoProductoService {

  public TipoProducto create(TipoProducto tipoProducto);

  public TipoProducto update(TipoProducto tipoProducto);

  public TipoProducto findById(Long id);

  public List<TipoProducto> findAll();

  public void deleteTipoProd(Long id);
}
