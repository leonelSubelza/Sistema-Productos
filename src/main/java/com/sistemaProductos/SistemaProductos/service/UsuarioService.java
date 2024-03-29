package com.sistemaProductos.SistemaProductos.service;

import com.sistemaProductos.SistemaProductos.model.Usuario;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional
public class UsuarioService implements IUsuarioService {
  @PersistenceContext
  EntityManager entityManager;

  @Override
  @Transactional
  public List<Usuario> getUsuarios() {
    String query = "FROM Usuario";
    TypedQuery<Usuario> query2 = entityManager.createQuery(query, Usuario.class);
    List<Usuario> lista = query2.getResultList();
    return lista;
  }

  @Override
  public void eliminar(Long id) {
    Usuario usuario = entityManager.find(Usuario.class, id);
    entityManager.remove(usuario);
  }

  @Override
  public void registrar(Usuario usuario) {
    entityManager.merge(usuario);
  }

  @Override
  public Usuario obtenerUsuarioPorCredenciales(Usuario usuario) {
    String query = "FROM Usuario WHERE email = :email";

    TypedQuery<Usuario> query2 = entityManager.createQuery(query, Usuario.class);
    List<Usuario> lista = query2.setParameter("email", usuario.getEmail())
        .getResultList();

    if (lista.isEmpty()) {
      return null;
    }

    String passwordHashed = lista.get(0).getPassword();

    Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
    if (argon2.verify(passwordHashed, usuario.getPassword().toCharArray())) {
      return lista.get(0);
    }
    return null;
  }
}
