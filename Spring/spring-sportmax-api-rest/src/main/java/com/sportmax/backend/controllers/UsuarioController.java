package com.sportmax.backend.controllers;

import com.sportmax.backend.models.entity.Rol;
import com.sportmax.backend.models.entity.Usuario;
import com.sportmax.backend.services.IUsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;


import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin(origins = {"*"})
@RestController
@RequestMapping("/api")
public class UsuarioController {

    @Autowired
    private IUsuarioService usuarioService;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    //buscar usuario por id
    @GetMapping("/usuario/{id}")
    @Secured({"ROLE_USER"})
    public ResponseEntity<?> verUsuarios(@PathVariable Long id){
        Usuario usuario = null;
        Map<String,Object> response = new HashMap<>();
        try {
            usuario = usuarioService.findById(id);
        } catch (DataAccessException e) {
            response.put("mensaje", "Error de acceso a los datos en la base de datos");
            response.put("error", "error ".concat(e.getMessage()).concat(" : ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        if (usuario == null) {
            response.put("mensaje", "Error de acceso al usuario");
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<Usuario>(usuario, HttpStatus.OK);
    }

    //Crear un nuevo usuario
    @PostMapping("/usuarios")
    public ResponseEntity<?> crearUsuario(@Valid @RequestBody Usuario usuario, BindingResult result){
    Usuario usuarioNuevo = null;
    Map<String,Object> response = new HashMap<>();
    if(result.hasErrors()){
        List<String> errors = result.getFieldErrors()
                .stream()
                .map(err -> "El campo '" + err.getField() + "' " + err.getDefaultMessage())
                .collect(Collectors.toList());

        response.put("errors", errors);
        return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
    }
    if(usuario.getNombre() == null || usuario.getNombre().trim() == ""){
        response.put("mensaje","El nombre del usuario no puede estar vacio");
        return new ResponseEntity<Map<String,Object>>(response,HttpStatus.NOT_ACCEPTABLE);
    }
    if(usuario.getPassword() == null || usuario.getPassword().trim() == ""){
            response.put("mensaje","La contraseña del usuario no puede estar vacia");
            return new ResponseEntity<Map<String,Object>>(response,HttpStatus.NOT_ACCEPTABLE);
    }
    try {
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        usuario.setEnabled(true);
        usuarioNuevo = usuarioService.save(usuario);
        if(usuarioNuevo!=null) {
            usuarioService.rolUser((int) (long) usuarioNuevo.getId());
        }
    }
    catch (DataAccessException e){
        response.put("mensaje", "Error al hacer el insert en la base de datos");
        response.put("error", "error ".concat(e.getMessage()).concat(" : ").concat(e.getMostSpecificCause().getMessage()));
        return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
        response.put("mensaje", "Usuario creado con exito");
        response.put("cliente", usuarioNuevo);
        return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
    }

}
