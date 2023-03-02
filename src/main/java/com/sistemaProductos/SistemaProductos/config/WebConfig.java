package com.sistemaProductos.SistemaProductos.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


//Se crea un archivo de configuracion para que cualquier cliente web pueda consumir la aplicacion
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String currentDirectory = System.getProperty("user.dir").replace( "\\" , "/");
        String imagePath = currentDirectory + "/src/main/resources/static/images/";
        registry.addResourceHandler("/static/images/**")
                //.addResourceLocations("file:///F:/escritorio/lio/github proyectos/Sistema-Productos/src/main/resources/static/images/")
                .addResourceLocations("file:///"+imagePath)
                .setCachePeriod(0);
    }

    /*
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/static/images/**")
                .addResourceLocations("file:///F:/escritorio/lio/github proyectos/Sistema-Productos/src/main/resources/static/images/")
                                               F:\escritorio\lio\github proyectos\Sistema-Productos+/src/main/resources/static/images/

                .setCachePeriod(0);
    }


//funciona pero no carga imagenes agregadas
@Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/static/**")
                .addResourceLocations("file:static/images/")
                .setCachePeriod(0);;
    }


        @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/static/**").
                addResourceLocations("classpath:/static/images/").setCachePeriod(0);;
    }
    * */
}