package com.sistemaProductos.SistemaProductos.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "tiposProductos")
public class TipoProducto {

    //Id autoincremental
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre", nullable = false, length = 150)
    private String nombre;

    //FetchType.LAZY = La peticion se hará de tipo lazy para consumir menos recursos
    //mappedBy = nombre del atributo al que se hace referencia en la clase Producto (a la variable)
    //cascade  = Cuando se borre esta fila de la bd, se borraran todos los elem asociados a este
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "tipoProducto", cascade = CascadeType.ALL)
    List<Producto> productos;//Este atributo no se cargará en la bd, pero servirá para obtener todos los prod asociados

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public List<Producto> getProductos() {
        return productos;
    }

    public void setProductos(List<Producto> productos) {
        this.productos = productos;
    }
}
