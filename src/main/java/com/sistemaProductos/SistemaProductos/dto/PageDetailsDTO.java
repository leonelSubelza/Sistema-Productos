package com.sistemaProductos.SistemaProductos.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PageDetailsDTO {
    private String title;
    private String descriptionTitle;
    private String pageLogo;
    private String frontPageImage;
    private String nroWhatsapp;
    private String pageDescription;
}
