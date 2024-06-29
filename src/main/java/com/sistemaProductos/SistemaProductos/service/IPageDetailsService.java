package com.sistemaProductos.SistemaProductos.service;

import com.sistemaProductos.SistemaProductos.dto.PageDetailsDTO;
import com.sistemaProductos.SistemaProductos.model.PageDetails;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface IPageDetailsService {
    public PageDetails create(PageDetailsDTO pageDetailsDTO, Optional<MultipartFile> frontPageImageObj);

    public PageDetails update(PageDetails pageDetails,Optional<MultipartFile> frontPageImageObj);

    public PageDetails findById(Long id);

    public List<PageDetails> readAll();
    public void deleteById(Long id);
}
