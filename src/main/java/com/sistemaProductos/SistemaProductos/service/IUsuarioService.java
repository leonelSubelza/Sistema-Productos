package com.sistemaProductos.SistemaProductos.service;

import com.sistemaProductos.SistemaProductos.model.Usuario;

import java.util.List;

public interface IUsuarioService {
    public List<Usuario> getUsuarios();

    public void eliminar(Long id);

    public Usuario registrar(Usuario usuario);

    public Usuario obtenerPorId(Long id);
    public Usuario getUsuario(Usuario usuario);
}
