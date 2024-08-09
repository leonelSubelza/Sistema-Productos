package com.sistemaProductos.SistemaProductos.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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