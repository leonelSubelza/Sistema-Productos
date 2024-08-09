package com.sistemaProductos.SistemaProductos.utils;

//public class Runner{}
/*
@Component
public class Runner implements CommandLineRunner {

  @Autowired
  private UsuarioService usuarioService;

  @Autowired
  private TipoProductoService tipoProductoService;

  @Autowired
  private ProductoController productoController;

  @Autowired
  private ResourceLoader resourceLoader;

  private boolean usuarioCreado = false;

  @Override
  public void run(String... args) throws Exception {
    if (!usuarioCreado) {
      Usuario usuario = new Usuario();
      usuario.setEmail("admin@gmail.com");
      usuario.setPassword("admin1234");

      Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
      String hash = argon2.hash(1, 1024, 1, usuario.getPassword().toCharArray());
      usuario.setPassword(hash);

      usuarioService.registrar(usuario);

      usuarioCreado = true;
    }

    List<String> nombresProductos = Arrays.asList("REMERA", "REMERA BOREAL", "REMERA WORLD", "REMERA FOX",
        "REMERA LIGTH");

    for (String nombre : nombresProductos) {
      Boolean tipoProductoExistente = false;
      List<TipoProducto> ListaTipoProducto = tipoProductoService.findAll();
      for (TipoProducto tipoProducto : ListaTipoProducto) {
        if (tipoProducto.getNombre().equals(nombre)) {
          tipoProductoExistente = true;
          break;
        }
      }

      if (!tipoProductoExistente) {
        TipoProducto tipoProducto = new TipoProducto();
        tipoProducto.setNombre(nombre);
        tipoProductoService.create(tipoProducto);
      }
    }

    List<TipoProducto> listaTipoProducto=tipoProductoService.findAll();
    for (int i = 1; i <= 3; i++) {
      Producto remera = new Producto();
      remera.setNombre("Remera " + i);
      remera.setDescripcion("Descripción de la remera " + i);
      remera.setPrecio(Double.toString(20 * i));
      remera.setTipoProducto(listaTipoProducto.get(i));
      remera.setGenero("MASCULINO");


      // Cargar la imagen como un recurso
      Resource imagenResource = resourceLoader.getResource("classpath:/static/imagenesCargadas/remera-" + i + ".png");

      // Leer los contenidos de la imagen como un array de bytes
      byte[] imagenBytes = Files.readAllBytes(imagenResource.getFile().toPath());

      // Pasar la imagen como un parámetro de MultipartFile
      MockMultipartFile imagenFile = new MockMultipartFile("imagenObj", imagenResource.getFilename(), "image/png",
          imagenBytes);

      //productoController.create(remera, listaTipoProducto.get(i).getId(), Optional.of(imagenFile));
    }

  }
}*/
