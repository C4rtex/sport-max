package com.sportmax.backend.auth;


import com.sportmax.backend.models.entity.Usuario;
import com.sportmax.backend.services.IUsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.TokenEnhancer;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class InfoAdicionalToken  implements TokenEnhancer {
    @Autowired
    private IUsuarioService usuarioService;
    
    @Override
    public OAuth2AccessToken enhance(OAuth2AccessToken oAuth2AccessToken, OAuth2Authentication oAuth2Authentication) {
        Usuario usuario = usuarioService.findByEmail(oAuth2Authentication.getName());
        Map<String,Object> info = new HashMap<>();
        info.put("nombre",usuario.getNombre());
        info.put("id",usuario.getId());
        info.put("email",usuario.getUsername());
        ((DefaultOAuth2AccessToken) oAuth2AccessToken).setAdditionalInformation(info);
        return oAuth2AccessToken;
    }
}
