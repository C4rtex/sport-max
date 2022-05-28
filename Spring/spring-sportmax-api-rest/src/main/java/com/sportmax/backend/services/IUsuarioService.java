package com.sportmax.backend.services;

import com.sportmax.backend.models.entity.Rutina;
import com.sportmax.backend.models.entity.Usuario;

import java.util.List;

public interface IUsuarioService {

    public Usuario findById(Long id);
    public Usuario save(Usuario usuario);
    public List<Rutina> buscarRutinaPorUsuario(Long id);
    public Rutina buscarRutinaPorId(Long id);
    public Rutina saveRutina(Rutina rutina);
    public Usuario findByEmail(String username);
    public void rolUser(Integer userId);
}
