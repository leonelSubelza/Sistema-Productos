package com.sistemaProductos.SistemaProductos.service;

import com.sistemaProductos.SistemaProductos.model.Usuario;
import com.sistemaProductos.SistemaProductos.repository.IUsuarioRepository;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.ws.rs.NotFoundException;
import java.util.List;

@Service
public class UsuarioService implements IUsuarioService {
    @Autowired
    private IUsuarioRepository usuarioRepository;

    @Override
    public List<Usuario> getUsuarios() {
        return this.usuarioRepository.findAll();
    }

    @Override
    public void eliminar(Long id) {
        Usuario topic = this.usuarioRepository.findById(id)
                .orElseThrow(()-> new NotFoundException("El usuario que se desea eliminar no existe"));
        this.usuarioRepository.deleteById(id);
    }

    @Override
    public Usuario registrar(Usuario usuario) {
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        String passwordEncripted = argon2.hash(
                1, 1024, 1, usuario.getPassword().toCharArray());
        usuario.setPassword(passwordEncripted);
        return this.usuarioRepository.save(usuario);
    }

    @Override
    public Usuario obtenerPorId(Long id) {
        return this.usuarioRepository.findById(id).orElseThrow(
                () -> new NotFoundException("El usuario con id "+id+" no existe"));
    }

    @Override
    public Usuario getUsuario(Usuario usuario) {
        Usuario usuarioEncontrado = this.usuarioRepository.findUsuarioByEmail(usuario.getEmail());
        System.out.println("usuario encontrado: "+usuarioEncontrado);
        if(!usuarioEncontrado.getPassword().equals(usuarioEncontrado.getPassword())){
            throw new NotFoundException("El usuario solicitado no existe");
        }
        String passwordHashed = usuarioEncontrado.getPassword();
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        if (!argon2.verify(passwordHashed, usuario.getPassword().toCharArray())) {
            throw new NotFoundException("El usuario solicitado no existe");
        }
        return usuarioEncontrado;
    }

/*  @PersistenceContext
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
  }*/
}
