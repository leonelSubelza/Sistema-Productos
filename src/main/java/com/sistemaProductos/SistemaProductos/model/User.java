package com.sistemaProductos.SistemaProductos.model;

import jakarta.persistence.*;
import lombok.*;

import javax.validation.constraints.Size;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "usuarios")
public class User {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "email")
    @Size(max=50, message = "Email is too large")
    private String email;

    @Column(name = "password")
    @Size(max=100, message = "Password is too large")
    private String password;

}
