package com.sistemaProductos.SistemaProductos.service;

import com.sistemaProductos.SistemaProductos.model.TiposProductos;
import com.sistemaProductos.SistemaProductos.repository.ITiposProductosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TiposProductosService implements ITiposProductosService{
    @Autowired
    private ITiposProductosRepository tiposProductosRepo;

    @Override
    public TiposProductos create(TiposProductos tipoProducto) {
        return this.tiposProductosRepo.save(tipoProducto);
    }

    @Override
    public TiposProductos update(TiposProductos tipoProducto) {
        return this.tiposProductosRepo.save(tipoProducto);
    }

    @Override
    public TiposProductos findById(Long id) {
        Optional<TiposProductos> tipoProdOptional = this.tiposProductosRepo.findById(id);
        return tipoProdOptional.orElse(null);
    }

    @Override
    public List<TiposProductos> findAll() {
        return this.tiposProductosRepo.findAll();
    }

    @Override
    public void delete(Long id) {
        this.tiposProductosRepo.deleteById(id);
    }
}
