package com.sistemaProductos.SistemaProductos.service;

import com.sistemaProductos.SistemaProductos.model.Usuario;

import java.util.List;

public interface IUsuarioService {
    List<Usuario> getUsuarios();

    void eliminar(Long id);

    void registrar(Usuario usuario);

    Usuario obtenerUsuarioPorCredenciales(Usuario usuario);
}
