package com.sistemaProductos.SistemaProductos.repository.specification;

import com.sistemaProductos.SistemaProductos.model.Product;
import org.springframework.data.jpa.domain.Specification;

import jakarta.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class ProductSpecification {

    public static Specification<Product> getProducts(Map<String, String> params) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            params.forEach((key, value) -> {
                switch (key) {
                    case "nombre":
                        predicates.add(criteriaBuilder.like(root.get("nombre"),"%" + value + "%"));
                        break;
                    case "tipoProducto":
                        predicates.add(criteriaBuilder.equal(root.get("tipoProducto").get("id"), Long.parseLong(value)));
                        break;
                    case "genero":
                        predicates.add(criteriaBuilder.equal(root.get("genero"), value));
                        break;
                    // Agrega más casos según los parámetros que quieras soportar
                }
            });

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }
}