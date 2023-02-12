package com.sistemaProductos.SistemaProductos.service;

import com.sistemaProductos.SistemaProductos.model.TipoProducto;
import com.sistemaProductos.SistemaProductos.repository.ITipoProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TipoProductoService implements ITipoProductoService {
    @Autowired
    private ITipoProductoRepository tipoProductoRepo;

    @Override
    public TipoProducto create(TipoProducto tipoProducto) {
        return this.tipoProductoRepo.save(tipoProducto);
    }

    @Override
    public TipoProducto update(TipoProducto tipoProducto) {
        return this.tipoProductoRepo.save(tipoProducto);
    }

    @Override
    public TipoProducto findById(Long id) {
        Optional<TipoProducto> tipoProdOptional = this.tipoProductoRepo.findById(id);
        return tipoProdOptional.orElse(null);
    }

    @Override
    public List<TipoProducto> findAll() {
        return this.tipoProductoRepo.findAll();
    }

    @Override
    public void deleteTipoProd(Long id) {
        this.tipoProductoRepo.deleteById(id);
    }
}
