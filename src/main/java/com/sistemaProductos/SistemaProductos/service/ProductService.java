package com.sistemaProductos.SistemaProductos.service;

import java.util.Map;
import java.util.Optional;

import com.sistemaProductos.SistemaProductos.dto.ProductResponseDTO;
import com.sistemaProductos.SistemaProductos.exception.ModelNotFoundException;
import com.sistemaProductos.SistemaProductos.model.ProductType;
import com.sistemaProductos.SistemaProductos.repository.specification.ProductSpecification;
import com.sistemaProductos.SistemaProductos.utils.ImageUtils;
import com.sistemaProductos.SistemaProductos.utils.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.sistemaProductos.SistemaProductos.model.Product;
import com.sistemaProductos.SistemaProductos.repository.IProductRepository;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ProductService implements IProductService {

	@Value("${images.file.products.name}")
	private String productsFileName;

	@Autowired
	private IProductRepository productRepo;

	@Autowired
	private IProductTypeService productTypeService;

	@Override
	public Product create(ProductResponseDTO product, Optional<MultipartFile> imageObj) {
		ProductType tipoProducto = this.productTypeService.findById(product.getProductTypeId());
		Product productToSave = ObjectMapper.mapProductResponseDTOToProduct(product,tipoProducto);
        imageObj.ifPresent(multipartFile -> {
			ImageUtils.saveImage(multipartFile,productsFileName);
			product.setImagen(imageObj.get().getOriginalFilename());
		});
		return this.productRepo.save(productToSave);
	}

	@Override
	public Page<ProductResponseDTO> findAll(Pageable pageable) {
		Page<Product> listProducts= productRepo.findAll(pageable);
		return listProducts.map(product -> ObjectMapper.mapProductToProductResponseDTO(product));
	}

	public Page<ProductResponseDTO> searchProducts(Map<String, String> params, Pageable pageable) {
		Specification<Product> spec = ProductSpecification.getProducts(params);
		return productRepo.findAll(spec, pageable).map(prod -> ObjectMapper.mapProductToProductResponseDTO(prod));
	}

		public Page<ProductResponseDTO> findAllByProductType(Long productTypeId, Pageable pageable){
		ProductType productType = productTypeService.findById(productTypeId);
		Page<Product> listProducts= productRepo.findByTipoProducto(productType,pageable);
//		System.out.println(listProducts.getContent());
		return listProducts.map(ObjectMapper::mapProductToProductResponseDTO);
	}

	@Override
	public Page<ProductResponseDTO> findByGeneroAndTipoProducto(
			String genero,
			Long productTypeId,
			Pageable pageable
	) {
		ProductType productType = productTypeService.findById(productTypeId);
		Page<Product> listProducts= productRepo.findByGeneroAndTipoProducto(genero,productType,pageable);
		return listProducts.map(ObjectMapper::mapProductToProductResponseDTO);
	}

	public Page<ProductResponseDTO> findByNombreAndTipoProducto(String nombre,Long productTypeId,Pageable pageable) {
		ProductType productType = productTypeService.findById(productTypeId);
		Page<Product> listProducts= productRepo.findByNombreAndTipoProducto(nombre,productType,pageable);
		return listProducts.map(ObjectMapper::mapProductToProductResponseDTO);
	}

	@Override
	public Product update(ProductResponseDTO product, Optional<MultipartFile> imageObj) {
		Product productSaved = this.productRepo.findById(product.getId())
				.orElseThrow(() -> new ModelNotFoundException("El producto que se intenta actualizar no existe"));

		ProductType productTypeSaved = this.productTypeService.findById(product.getProductTypeId());
		System.out.println("producto a actualizar:");
		System.out.println(product);
		Product productToSave = ObjectMapper.mapProductResponseDTOToProduct(product,productTypeSaved);

		productToSave.setId(productSaved.getId());
		imageObj.ifPresent(multipartFile -> {
			ImageUtils.saveImage(multipartFile,productsFileName);
			product.setImagen(imageObj.get().getOriginalFilename());
		});

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

/*	//Save the image in the project directory
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
	}*/

/*	public Product mapProductResponseDTOToProduct(ProductResponseDTO productResponseDTO,ProductType productType){
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
	}*/
}