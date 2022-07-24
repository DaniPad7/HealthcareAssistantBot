package com.ignite.hcassistantbot.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;

@Configuration
public class SecurityConfiguration {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.cors();
        http.csrf().disable()
            .authorizeHttpRequests((authZ) -> authZ.anyRequest().permitAll());
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        final CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.addAllowedOriginPattern("*");
        corsConfiguration.setAllowedMethods(
                Collections.unmodifiableList(Arrays.asList("GET", "POST", "OPTIONS"))
        );
        corsConfiguration.setAllowCredentials(true);
        corsConfiguration.setAllowedHeaders(
                Collections.unmodifiableList(Arrays.asList("Authorization", "Cache-Control", "Content-Type"))
        );
        corsConfiguration.setExposedHeaders(
                Collections.unmodifiableList(Arrays.asList("Authorization", "Cache-Control", "Content-Type"))
        );
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);
        return source;
    }
}
