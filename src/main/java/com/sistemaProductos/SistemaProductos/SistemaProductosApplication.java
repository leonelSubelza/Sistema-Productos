package com.sistemaProductos.SistemaProductos;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
//@ComponentScan(basePackages = {"com.sistemaProductos.SistemaProductos"})
public class SistemaProductosApplication {

	public static void main(String[] args) {
		SpringApplication.run(SistemaProductosApplication.class, args);
	}

}
