package com.sistemaProductos.SistemaProductos.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

import com.sistemaProductos.SistemaProductos.dto.ProductResponseDTO;
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
	public Product create(ProductResponseDTO product, Optional<MultipartFile> imageObj) {
		ProductType tipoProducto = this.productTypeService.findById(product.getProductTypeId());
		Product productToSave = mapProductResponseDTOToProduct(product,tipoProducto);
        imageObj.ifPresent(multipartFile -> saveImage(productToSave, multipartFile));
		return this.productRepo.save(productToSave);
	}

	@Override
	public Page<ProductResponseDTO> findAll(Pageable pageable) {
		Page<Product> listProducts= productRepo.findAll(pageable);
		return listProducts.map(product -> mapProductToProductResponseDTO(product));
	}

	public Page<ProductResponseDTO> findAllByProductType(Long productTypeId, Pageable pageable){
		ProductType productType = productTypeService.findById(productTypeId);
		Page<Product> listProducts= productRepo.findByTipoProducto(productType,pageable);
//		System.out.println(listProducts.getContent());
		return listProducts.map(this::mapProductToProductResponseDTO);
	}


	@Override
	public Product update(ProductResponseDTO product, Optional<MultipartFile> imageObj) {
		Product productSaved = this.productRepo.findById(product.getId())
				.orElseThrow(() -> new ModelNotFoundException("El producto que se intenta actualizar no existe"));

		ProductType productTypeSaved = this.productTypeService.findById(product.getProductTypeId());
		System.out.println("producto a actualizar:");
		System.out.println(product);
		Product productToSave = mapProductResponseDTOToProduct(product,productTypeSaved);

		productToSave.setId(productSaved.getId());
        imageObj.ifPresent(multipartFile -> saveImage(productSaved, multipartFile));

		return this.productRepo.save(productToSave);
	}

	@Override
	public void delete(Long id) {
		Product productToDelete = this.productRepo.findById(id)
				.orElseThrow(() -> new ModelNotFoundException("El producto a borrar no existe"));
		this.productRepo.delete(productToDelete);
	}

	@Override
	public Product findById(Long id) {
		return this.productRepo.findById(id)
				.orElseThrow(() -> new ModelNotFoundException("El producto solicitado no existe"));
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

	public Product mapProductResponseDTOToProduct(ProductResponseDTO productResponseDTO,ProductType productType){
		return Product.builder()
				.nombre(productResponseDTO.getNombre())
				.descripcion(productResponseDTO.getDescripcion())
				.imagen(productResponseDTO.getImagen())
				.precio(productResponseDTO.getPrecio())
				.genero(productResponseDTO.getGenero())
				.tipoProducto(productType)
				.build();
	}

	public ProductResponseDTO mapProductToProductResponseDTO(Product product){
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
}