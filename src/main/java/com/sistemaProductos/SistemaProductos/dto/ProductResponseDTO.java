package com.sistemaProductos.SistemaProductos.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sistemaProductos.SistemaProductos.model.ProductType;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponseDTO {
    private Long id;
    private String nombre;
    private String descripcion;
    private String imagen;
    private String precio;
    private String genero;
    private Long productTypeId;
}
