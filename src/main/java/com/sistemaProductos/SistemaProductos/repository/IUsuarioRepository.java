package com.sistemaProductos.SistemaProductos.repository;

import com.sistemaProductos.SistemaProductos.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IUsuarioRepository extends JpaRepository<Usuario,Long> {
    Usuario findUsuarioByEmail(String email);
}
