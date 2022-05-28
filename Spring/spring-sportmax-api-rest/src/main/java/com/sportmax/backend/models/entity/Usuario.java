package com.sportmax.backend.models.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.sun.istack.NotNull;
import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.List;

@Entity
@Data
@Table(name = "usuarios")
public class Usuario implements Serializable {

    private static final long serialVersionUID=1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotEmpty(message="no debe estar vacio")
    @Size(min=4,max=30,message = "El tamaño tiene que ser entre 4 y 12")
    @Column(nullable=false)
    private String nombre;

    @NotEmpty(message="no debe estar vacio")
    @Email(message = "El formato no es correcto")
    @Column(nullable=false,unique = true)
    private String username;

    @NotEmpty(message="no debe estar vacio")
    @Column(nullable=false)
    private String password;
    private boolean enabled;
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "usuarios_roles", joinColumns = @JoinColumn(name="usuario_id"),
    inverseJoinColumns = @JoinColumn(name="role_id"),
    uniqueConstraints = {@UniqueConstraint(columnNames = {"usuario_id","role_id"})})
    private List<Rol> roles;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnoreProperties(value={"usuario","hibernateLazyInitializer","handler"},allowSetters = true)
    private List<Rutina> rutinas;
    public boolean getEnabled() {
        return enabled;
    }

}
