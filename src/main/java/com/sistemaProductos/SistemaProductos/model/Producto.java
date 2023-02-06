package com.sistemaProductos.SistemaProductos.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table( name = "productos")
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name = "nombre", nullable = false, length = 150)
	private String nombre;
	
	//@Column(name = "tipo", length = 150)
	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "idTipoProducto")//nombre que tendrá la columna en la tabla
	private TiposProductos tipoProducto;
	
	@Column(name = "precio", nullable = false, length = 150)
	private String precio;

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

	public String getPrecio() {
		return precio;
	}

	public void setPrecio(String precio) {
		this.precio = precio;
	}

	public TiposProductos getTipoProducto() {
		return tipoProducto;
	}

	public void setTipoProducto(TiposProductos tipoProducto) {
		this.tipoProducto = tipoProducto;
	}
}
