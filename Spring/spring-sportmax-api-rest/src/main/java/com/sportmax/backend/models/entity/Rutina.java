package com.sportmax.backend.models.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.List;

@Entity
@Data
@Table(name = "rutinas")
public class Rutina implements Serializable {
    private static final long serialVersionUID=1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty(message = "no puede estar vacio")
    private String nombreRutina;
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnoreProperties(value={"rutina","hibernateLazyInitializer","handler"},allowSetters = true)
    private List<Ejercicio> ejercicios;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value={"password","rutinas","hibernateLazyInitializer","handler"},allowSetters = true)
    private Usuario usuario;

    @NotNull(message = "no debe estar vacio")
    private Integer series;

    public Double getTotalRutina(){
        Double total=0.00;
        for (Ejercicio ejercicio:ejercicios){
            total+=ejercicio.getDuracion();
        }
        return  total;
    }
}
