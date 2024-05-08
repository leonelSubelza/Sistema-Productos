package com.sistemaProductos.SistemaProductos.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import javax.validation.constraints.NotNull;
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
@Table(name = "productos")
public class Producto {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  @Column(name = "nombre", length = 150)
  @NotNull
  private String nombre;

  @Column(length = 255)
  private String descripcion;

  private String imagen;

  @Column(name = "precio", nullable = false, length = 150)
  private String precio;

  @Column(name = "genero", nullable = false)
  private String genero;

  // Muchos productos pertenecen a un único tipoProducto
  // JsonProperty ignora la propiedad para que no deserialice la propiedad
  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "idTipoProducto")
  @JsonProperty(access = Access.WRITE_ONLY)
  private TipoProducto tipoProducto;
}
