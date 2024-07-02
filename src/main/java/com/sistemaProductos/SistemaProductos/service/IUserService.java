package com.sistemaProductos.SistemaProductos.service;

import com.sistemaProductos.SistemaProductos.dto.UserDTO;
import com.sistemaProductos.SistemaProductos.model.User;

import java.util.List;

public interface IUserService {
    public List<User> findAll();

    public void deleteById(Long id);

    public User save(User user);

    public User getById(Long id);
    public User getUser(UserDTO user);
}
