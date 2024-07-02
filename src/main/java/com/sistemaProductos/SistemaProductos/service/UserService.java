package com.sistemaProductos.SistemaProductos.service;

import com.sistemaProductos.SistemaProductos.dto.UserDTO;
import com.sistemaProductos.SistemaProductos.model.User;
import com.sistemaProductos.SistemaProductos.repository.IUserRepository;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.ws.rs.NotFoundException;
import java.util.List;

@Service
public class UserService implements IUserService {
    @Autowired
    private IUserRepository userRepository;

    @Override
    public List<User> findAll() {
        return this.userRepository.findAll();
    }

    @Override
    public void deleteById(Long id) {
        User topic = this.userRepository.findById(id)
                .orElseThrow(()-> new NotFoundException("El usuario que se desea eliminar no existe"));
        this.userRepository.deleteById(id);
    }

    @Override
    public User save(User user) {
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        String passwordEncripted = argon2.hash(
                1, 1024, 1, user.getPassword().toCharArray());
        user.setPassword(passwordEncripted);
        return this.userRepository.save(user);
    }

    @Override
    public User getById(Long id) {
        return this.userRepository.findById(id).orElseThrow(
                () -> new NotFoundException("El usuario con id "+id+" no existe"));
    }

    @Override
    public User getUser(UserDTO user) {
        User userFounded = this.userRepository.findUserByEmail(user.getEmail());
        String passwordHashed = userFounded.getPassword();
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        if (!argon2.verify(passwordHashed, user.getPassword().toCharArray())) {
            throw new NotFoundException("El usuario solicitado no existe");
        }
        return userFounded;
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
