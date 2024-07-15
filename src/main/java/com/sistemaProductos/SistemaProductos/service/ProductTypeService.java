package com.sistemaProductos.SistemaProductos.service;

import com.sistemaProductos.SistemaProductos.exception.ModelNotFoundException;
import com.sistemaProductos.SistemaProductos.model.ProductType;
import com.sistemaProductos.SistemaProductos.repository.IProductTypeRepository;
import com.sistemaProductos.SistemaProductos.utils.ImageUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
public class ProductTypeService implements IProductTypeService {

  @Value("${images.file.productsTypes.name}")
  private String productsTypeFileName;

  @Autowired
  private IProductTypeRepository productTypeRepository;

  @Override
  public ProductType create(ProductType productType,Optional<MultipartFile> imageObj) {
    imageObj.ifPresent(multipartFile -> {
      ImageUtils.saveImage(multipartFile,productsTypeFileName);
      productType.setImagen(imageObj.get().getOriginalFilename());
    });
    return this.productTypeRepository.save(productType);
  }

  @Override
  public ProductType update(ProductType productType,Optional<MultipartFile> imageObj) {
    ProductType productTypeToUpdate = this.productTypeRepository.findById(productType.getId())
            .orElseThrow(() -> new ModelNotFoundException("El tipo de producto a actualizar no existe"));

    imageObj.ifPresent(multipartFile -> {
      ImageUtils.saveImage(multipartFile,productsTypeFileName);
      productType.setImagen(imageObj.get().getOriginalFilename());
    });

    productTypeToUpdate.setNombre(productType.getNombre());
    productTypeToUpdate.setProductos(productType.getProductos());
    return this.productTypeRepository.save(productType);
  }

  @Override
  public ProductType findById(Long id) {
    return this.productTypeRepository.findById(id)
            .orElseThrow(() -> new ModelNotFoundException("El tipo de producto solicitado no existe"));
  }

  @Override
  public Page<ProductType> findAll(Pageable pageable) {
    return this.productTypeRepository.findAll(pageable);
  }

  @Override
  public List<ProductType> readAll() {
    return this.productTypeRepository.findAll();
  }

  @Override
  public void deleteById(Long id) {
    ProductType productTypeFounded = this.productTypeRepository.findById(id)
            .orElseThrow(() -> new ModelNotFoundException("El tipo de producto a borrar no existe"));
    if(!productTypeFounded.getImagen().isEmpty()){
      ImageUtils.deleteImageSaved(productTypeFounded.getImagen(),productsTypeFileName);
    }
    this.productTypeRepository.delete(productTypeFounded);
  }
}
