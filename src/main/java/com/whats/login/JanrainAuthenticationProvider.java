package com.whats.login;


import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.core.Authentication;

public class JanrainAuthenticationProvider implements AuthenticationProvider {

    public Authentication authenticate(Authentication authentication) {
        //Will never be called in reality, just a formality before Spring Security works (nonsense really)
        return null;
    }

    public boolean supports(Class<?> authentication) {
        return true;
    }

}
