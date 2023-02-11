package com.sistemaProductos.SistemaProductos.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import javax.validation.constraints.NotNull;
import jakarta.persistence.*;

@Entity
@Table( name = "productos")
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name = "nombre",length = 150)
	@NotNull
	private String nombre;

	@Column(length = 255)
	private String descripcion;

	private String imagen;

	@Column(name = "precio", nullable = false, length = 150)
	private String precio;

	//Muchos productos pertenecen a un único tipoProducto
	//JsonProperty ignora la propiedad para que no deserialice la propiedad
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "idTipoProducto")
	@JsonProperty(access = Access.WRITE_ONLY)
	private TipoProducto tipoProducto;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public String getImagen() {
		return imagen;
	}

	public void setImagen(String imagen) {
		this.imagen = imagen;
	}

	public String getPrecio() {
		return precio;
	}

	public void setPrecio(String precio) {
		this.precio = precio;
	}

	public TipoProducto getTipoProducto() {
		return tipoProducto;
	}

	public void setTipoProducto(TipoProducto tipoProducto) {
		this.tipoProducto = tipoProducto;
	}
}
