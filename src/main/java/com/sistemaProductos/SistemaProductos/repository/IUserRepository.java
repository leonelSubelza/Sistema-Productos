package com.sistemaProductos.SistemaProductos.repository;

import com.sistemaProductos.SistemaProductos.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IUserRepository extends JpaRepository<User,Long> {
    User findUserByEmail(String email);
}
