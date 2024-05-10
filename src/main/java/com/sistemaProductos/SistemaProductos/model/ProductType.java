package com.sistemaProductos.SistemaProductos.model;

import java.util.List;

// import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tiposProductos")
public class ProductType {

  // Id autoincremental
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "nombre", nullable = false, length = 150)
  private String nombre;

  // FetchType.LAZY = La peticion se hará de tipo lazy para consumir menos
  // recursos
  // mappedBy = nombre del atributo al que se hace referencia en la clase Producto
  // (a la variable)
  // cascade = Cuando se borre esta fila de la bd, se borraran todos los elem
  // asociados a este
  @OneToMany(fetch = FetchType.LAZY, mappedBy = "tipoProducto", cascade = CascadeType.ALL)
  @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
  List<Product> productos;// Este atributo no se cargará en la bd, pero servirá para obtener todos los
                           // prod asociados
}
