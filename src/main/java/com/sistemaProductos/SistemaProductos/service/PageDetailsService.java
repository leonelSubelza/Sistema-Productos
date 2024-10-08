package com.sistemaProductos.SistemaProductos.service;

import com.sistemaProductos.SistemaProductos.dto.PageDetailsDTO;
import com.sistemaProductos.SistemaProductos.exception.ModelNotFoundException;
import com.sistemaProductos.SistemaProductos.model.PageDetails;
import com.sistemaProductos.SistemaProductos.repository.IPageDetailsRepository;
import com.sistemaProductos.SistemaProductos.utils.ImageUtils;
import com.sistemaProductos.SistemaProductos.utils.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
public class PageDetailsService implements IPageDetailsService{

    @Value("${images.file.pageDetails.name}")
    private String pageDetailsFileName;

    @Autowired
    private IPageDetailsRepository pageDetailsRepository;

    @Override
    public PageDetails create(
            PageDetailsDTO pageDetailsDTO,
            Optional<MultipartFile> pageLogoImageMF,
            Optional<MultipartFile> frontPageImageMF
    ) {
        pageLogoImageMF.ifPresent(multipartFile -> {
            ImageUtils.saveImage(multipartFile,pageDetailsFileName);
            pageDetailsDTO.setFrontPageImage(pageLogoImageMF.get().getOriginalFilename());
        });
        frontPageImageMF.ifPresent(multipartFile -> {
            ImageUtils.saveImage(multipartFile,pageDetailsFileName);
            pageDetailsDTO.setFrontPageImage(frontPageImageMF.get().getOriginalFilename());
        });
        return this.pageDetailsRepository.save(ObjectMapper.mapPageDetailsDTOTOPageDetails(pageDetailsDTO));
    }

    @Override
    public PageDetails update(
            PageDetails pageDetails,
            Optional<MultipartFile> pageLogoImageMF,
            Optional<MultipartFile> frontPageImageMF
            ) {
        PageDetails pageDetailsSaved = this.pageDetailsRepository.findById(pageDetails.getId())
                .orElseThrow(() -> new ModelNotFoundException("El obj pageDetails que se intenta actualizar no existe"));
        pageLogoImageMF.ifPresent(multipartFile -> {
            ImageUtils.saveImage(multipartFile,pageDetailsFileName);
            pageDetails.setFrontPageImage(pageLogoImageMF.get().getOriginalFilename());
        });
        frontPageImageMF.ifPresent(multipartFile -> {
            ImageUtils.saveImage(multipartFile,pageDetailsFileName);
            pageDetails.setFrontPageImage(frontPageImageMF.get().getOriginalFilename());
        });
        return this.pageDetailsRepository.save(pageDetails);
    }

    @Override
    public PageDetails findById(Long id) {
        return this.pageDetailsRepository.findById(id)
                .orElseThrow(() -> new ModelNotFoundException("El obj pageDetails no existe"));
    }

    @Override
    public List<PageDetails> readAll() {
        return this.pageDetailsRepository.findAll();
    }

    @Override
    public void deleteById(Long id) {
        PageDetails pageDetailsSaved = this.pageDetailsRepository.findById(id)
                .orElseThrow(() -> new ModelNotFoundException("El obj pageDetails no existe"));
        if(!pageDetailsSaved.getFrontPageImage().isEmpty()){
            ImageUtils.deleteImageSaved(pageDetailsSaved.getFrontPageImage(),pageDetailsFileName);
        }
        this.pageDetailsRepository.deleteById(pageDetailsSaved.getId());
    }
}
