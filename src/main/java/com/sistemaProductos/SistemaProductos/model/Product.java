package com.sistemaProductos.SistemaProductos.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

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
public class Product {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "nombre", length = 150)
  @NotNull
  @Size(max=50, message = "Name is too large")
  private String nombre;

  @Column(length = 255)
  @Size(max=100, message = "Description is too large")
  private String descripcion;

  private String imagen;

  @Column(name = "precio", nullable = false, length = 150)
  @Size(max=100, message = "Precio is too large")
  private String precio;

  @Column(name = "genero", nullable = false)
  @Size(max=50, message = "Genero is too large")
  private String genero;

  // Muchos productos pertenecen a un único tipoProducto
  // JsonProperty ignora la propiedad para que no deserialice la propiedad
  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "idTipoProducto")
  @JsonProperty(access = Access.WRITE_ONLY)
  private ProductType tipoProducto;
}
