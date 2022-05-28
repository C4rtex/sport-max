package com.sportmax.backend.controllers;

import com.sportmax.backend.models.entity.Ejercicio;
import com.sportmax.backend.models.entity.Rutina;
import com.sportmax.backend.models.entity.Usuario;
import com.sportmax.backend.services.IUsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
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
public class RutinaController {
    @Autowired
    private IUsuarioService usuarioService;

    //buscar rutina por id de usuario
    @Secured({"ROLE_USER"})
    @GetMapping("/rutinas/{id}")
    public ResponseEntity<?> verRutinas(@PathVariable Long id){
        List<Rutina> rutina = null;
        Map<String,Object> response = new HashMap<>();
        try {
            rutina = usuarioService.buscarRutinaPorUsuario(id);
        } catch (DataAccessException e) {
            response.put("mensaje", "Error de acceso a los datos en la base de datos");
            response.put("error", "error ".concat(e.getMessage()).concat(" : ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        if (rutina == null) {
            response.put("mensaje", "No existe rutinas para el usuario");
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<List<Rutina>>(rutina, HttpStatus.OK);
    }
    @Secured({"ROLE_USER"})
    @GetMapping("/rutina/{id}")
    public ResponseEntity<?> verRutina(@PathVariable Long id){
        Rutina rutina = null;
        Map<String,Object> response = new HashMap<>();
        try {
            rutina = usuarioService.buscarRutinaPorId(id);
        } catch (DataAccessException e) {
            response.put("mensaje", "Error de acceso a los datos en la base de datos");
            response.put("error", "error ".concat(e.getMessage()).concat(" : ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        if (rutina == null) {
            response.put("mensaje", "No existe rutinas para el usuario");
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<Rutina>(rutina, HttpStatus.OK);
    }
    // ---------------------TO DO -----------------------------------
    // CREAR RUTINA POR USUARIO
    @Secured({"ROLE_USER"})
    @PostMapping("/rutinas")
    public ResponseEntity<?> crearRutina(@Valid @RequestBody Rutina rutina, BindingResult result){
        Rutina rutinaNueva = null;
        Map<String,Object> response = new HashMap<>();
        if(result.hasErrors()){
            List<String> errors = result.getFieldErrors()
                    .stream()
                    .map(err -> "El campo '" + err.getField() + "' " + err.getDefaultMessage())
                    .collect(Collectors.toList());

            response.put("errors", errors);
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.BAD_REQUEST);
        }
        if(rutina.getNombreRutina() == null || rutina.getNombreRutina().trim() == ""){
            response.put("mensaje","El nombre de la rutina no puede estar vacio");
            return new ResponseEntity<Map<String,Object>>(response,HttpStatus.NOT_ACCEPTABLE);
        }
        Usuario usuario= null;
        if(rutina.getUsuario() != null){
            usuario= rutina.getUsuario();
            if(usuario.getId() == null || usuario.getId().toString() == ""){
                response.put("mensaje","La rutina debe tener usuario");
                return new ResponseEntity<Map<String,Object>>(response,HttpStatus.NOT_ACCEPTABLE);
            }
        }else {
            response.put("mensaje","La rutina debe tener usuario");
            return new ResponseEntity<Map<String,Object>>(response,HttpStatus.NOT_ACCEPTABLE);
        }
        List<Ejercicio> ejecricios= null;
        if(rutina.getEjercicios() != null){
            ejecricios= rutina.getEjercicios();
            if(ejecricios.size() > 0 ){
                for (Ejercicio ejercicio:
                     ejecricios) {
                    if(ejercicio.getNombre()==null || ejercicio.getNombre().trim()==""){
                        response.put("mensaje","La rutina debe tener ejercicios con nombre");
                        return new ResponseEntity<Map<String,Object>>(response,HttpStatus.NOT_ACCEPTABLE);
                    }
                }
            }
            else {
                response.put("mensaje","La rutina debe tener por lo menos 1 ejercicio");
                return new ResponseEntity<Map<String,Object>>(response,HttpStatus.NOT_ACCEPTABLE);
            }
        }
        try {
            rutinaNueva = usuarioService.saveRutina(rutina);
        }
        catch (DataAccessException e){
            response.put("mensaje", "Error al hacer el insert en la base de datos");
            response.put("error", "error ".concat(e.getMessage()).concat(" : ").concat(e.getMostSpecificCause().getMessage()));
            return new ResponseEntity<Map<String, Object>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        response.put("mensaje", "Rutina creada con exito");
        response.put("cliente", rutinaNueva);
        return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
    }
}
