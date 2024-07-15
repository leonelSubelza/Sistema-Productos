package com.sistemaProductos.SistemaProductos.service;

import com.sistemaProductos.SistemaProductos.dto.PageDetailsDTO;
import com.sistemaProductos.SistemaProductos.model.PageDetails;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface IPageDetailsService {
    PageDetails create(PageDetailsDTO pageDetailsDTO,
                              Optional<MultipartFile> pageLogoImageMF,
                              Optional<MultipartFile> frontPageImageMF
    );

    PageDetails update(PageDetails pageDetails,
                              Optional<MultipartFile> pageLogoImageMF,
                              Optional<MultipartFile> frontPageImageMF
    );

    PageDetails findById(Long id);

    List<PageDetails> readAll();
    void deleteById(Long id);
}
