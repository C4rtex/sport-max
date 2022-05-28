package com.sportmax.backend.services;

import com.sportmax.backend.models.dao.IRutinaDAO;
import com.sportmax.backend.models.dao.IUsuarioDAO;
import com.sportmax.backend.models.entity.Rutina;
import com.sportmax.backend.models.entity.Usuario;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UsuarioServiceImpl implements IUsuarioService, UserDetailsService {
    private Logger logger = LoggerFactory.getLogger(UsuarioServiceImpl.class);
    @Autowired
    private IUsuarioDAO usuarioDAO;
    @Autowired
    private IRutinaDAO rutinaDAO;


    @Override
    @Transactional(readOnly = true)
    public Usuario findById(Long id) {
        return usuarioDAO.findById(id).orElse(null);
    }

    @Override
    public Usuario save(Usuario usuario) {
        return usuarioDAO.save(usuario);
    }

    @Override
    public List<Rutina> buscarRutinaPorUsuario(Long id) {
        return rutinaDAO.buscarRutina(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Rutina buscarRutinaPorId(Long id) {
        return rutinaDAO.findById(id).orElse(null);
    }

    @Override
    public Rutina saveRutina(Rutina rutina) {
        return rutinaDAO.save(rutina);
    }

    @Override
    @Transactional(readOnly = true)
    public Usuario findByEmail(String username) {
        return usuarioDAO.findByEmail(username);
    }

    @Override
    public void rolUser(Integer userId) {
        usuarioDAO.rolUser(userId);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Usuario usuario = usuarioDAO.findByEmail(username);
        if(usuario == null){
            logger.error("Error en el login: no existe el usuario "+username+" en el sistema");
            throw  new UsernameNotFoundException("Error en el login: no existe el usuario "+username+" en el sistema");
        }
        List<GrantedAuthority> authorities = usuario.getRoles().stream().map(
                role -> new SimpleGrantedAuthority(role.getNombre())
        ).peek(
                authority -> logger.info("Role: "+authority.getAuthority())
        ).collect(Collectors.toList());
        return new User(usuario.getUsername(),usuario.getPassword(),usuario.getEnabled(),true,true,true,authorities);
    }
}
