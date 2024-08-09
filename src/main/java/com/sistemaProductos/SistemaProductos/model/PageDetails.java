package com.sistemaProductos.SistemaProductos.model;

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
@Table(name = "page_details")
public class PageDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String pageName;
    private String pageSlogan;
    private String title;
    private String descriptionTitle;
    private String pageLogo;
    private String frontPageImage;
    private String nroWhatsapp;
    private String pageDescription;
}
