package com.sportmax.backend.models.dao;

import com.sportmax.backend.models.entity.Usuario;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

public interface IUsuarioDAO extends CrudRepository<Usuario,Long> {
    @Query("select u from Usuario u where u.username=?1")
    public Usuario findByEmail(String username);

    @Modifying
    @Query(value="insert into usuarios_roles (usuario_id,role_id) values(?1,1)", nativeQuery = true)
    @Transactional
    public void rolUser(Integer userId);
}
