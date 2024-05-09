package com.sistemaProductos.SistemaProductos.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

import com.sistemaProductos.SistemaProductos.exception.ModelNotFoundException;
import com.sistemaProductos.SistemaProductos.model.ProductType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.sistemaProductos.SistemaProductos.model.Product;
import com.sistemaProductos.SistemaProductos.repository.IProductRepository;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ProductService implements IProductService {

	@Autowired
	private IProductRepository productRepo;

	@Autowired
	private IProductTypeService productTypeService;

	@Override
	public Product create(Product product, Long productTypeId, Optional<MultipartFile> imageObj) {
		ProductType tipoProducto = this.productTypeService.findById(productTypeId);
		product.setTipoProducto(tipoProducto);
        imageObj.ifPresent(multipartFile -> saveImage(product, multipartFile));
		return this.productRepo.save(product);
	}

	@Override
	public Product update(Product product,Long productTypeId, Optional<MultipartFile> imageObj) {
		Product productSaved = this.productRepo.findById(product.getId())
				.orElseThrow(() -> new ModelNotFoundException("El producto que se intenta actualizar no existe"));

		productSaved.setTipoProducto(this.productTypeService.findById(productTypeId));
		if(imageObj.isPresent()){
			saveImage(productSaved,imageObj.get());
		}else{
			productSaved.setImagen(product.getImagen());
		}
		return this.productRepo.save(productSaved);
	}

	@Override
	public Product findById(Long id) {
		return this.productRepo.findById(id)
				.orElseThrow(() -> new ModelNotFoundException("El producto solicitado no existe"));
	}

	@Override
	public Page<Product> findAll(Pageable pageable) {
		return productRepo.findAll(pageable);
	}

	@Override
	public void delete(Long id) {
		Product productToDelete = this.productRepo.findById(id)
				.orElseThrow(() -> new ModelNotFoundException("El producto a borrar no existe"));
		this.productRepo.delete(productToDelete);
	}


	//Save the image in the project directory
	public void saveImage(Product product, MultipartFile imageObj){
		String currentDirectory = System.getProperty("user.dir").replace( "\\" , "/");
		File file = new File(currentDirectory+"/src/main/resources/static/images");
		if (!file.exists()) {
			if (file.mkdirs()) {
				System.out.println("Archivo images creado");
			}
		}
		Path path = Paths.get("src//main//resources//static/images");
		String absolutePath = path.toFile().getAbsolutePath();
		try{
			byte[] bytesImg = imageObj.getBytes();
			Path completePath = Paths.get(absolutePath+"//"+imageObj.getOriginalFilename());
			Files.write(completePath,bytesImg);
			product.setImagen(imageObj.getOriginalFilename());
		}catch (IOException e){
			e.printStackTrace();
		}
	}
}
