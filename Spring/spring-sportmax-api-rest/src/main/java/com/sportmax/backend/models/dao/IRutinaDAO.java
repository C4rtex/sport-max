package com.sportmax.backend.models.dao;

import com.sportmax.backend.models.entity.Rutina;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface IRutinaDAO extends CrudRepository<Rutina,Long> {
    @Query("select r from Rutina r where r.usuario.id=?1")
    public List<Rutina> buscarRutina(Long id);
}
