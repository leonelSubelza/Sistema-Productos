package com.sistemaProductos.SistemaProductos.utils;

import com.sistemaProductos.SistemaProductos.dto.PageDetailsDTO;
import com.sistemaProductos.SistemaProductos.dto.ProductResponseDTO;
import com.sistemaProductos.SistemaProductos.model.PageDetails;
import com.sistemaProductos.SistemaProductos.model.Product;
import com.sistemaProductos.SistemaProductos.model.ProductType;

public class ObjectMapper {

    public static Product mapProductResponseDTOToProduct(ProductResponseDTO productResponseDTO, ProductType productType){
        return Product.builder()
                .nombre(productResponseDTO.getNombre())
                .descripcion(productResponseDTO.getDescripcion())
                .imagen(productResponseDTO.getImagen())
                .precio(productResponseDTO.getPrecio())
                .genero(productResponseDTO.getGenero())
                .tipoProducto(productType)
                .build();
    }

    public static ProductResponseDTO mapProductToProductResponseDTO(Product product){
        return ProductResponseDTO
                .builder()
                .id(product.getId())
                .nombre(product.getNombre())
                .descripcion(product.getDescripcion())
                .imagen(product.getImagen())
                .precio(product.getPrecio())
                .genero(product.getGenero())
                .productTypeId(product.getTipoProducto().getId())
                .build();
    }

    public static PageDetails mapPageDetailsDTOTOPageDetails(PageDetailsDTO pageDetailsDTO){
        return PageDetails.builder()
                .title(pageDetailsDTO.getTitle())
                .description(pageDetailsDTO.getDescription())
                .frontPageImage(pageDetailsDTO.getFrontPageImage())
                .build();
    }
}
