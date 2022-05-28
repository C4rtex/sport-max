package com.sportmax.backend.models.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
@Entity
@Data
@Table(name = "ejercicios")
public class Ejercicio implements Serializable {
    private static final long serialVersionUID=1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false)
    private Integer duracion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value={"ejercicios","hibernateLazyInitializer","handler"},allowSetters = true)
    private Rutina rutina;
}
