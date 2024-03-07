package Kyle.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

// These packages could end up being moved out of that service if I need to.
import Kyle.backend.service.JwtService.JWTTokenDecoder;
import Kyle.backend.service.JwtService.TokenDecoder;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

  @Bean
  public SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
    http
      .csrf(csrf -> csrf.disable())
      .authorizeHttpRequests(authorizeRequests -> authorizeRequests
        .requestMatchers("/api/login/", "/api/refresh/", "/api/register/").permitAll()
        .requestMatchers(HttpMethod.POST, "/api/**").authenticated()
        .requestMatchers(HttpMethod.PUT, "/api/**").authenticated()
        .requestMatchers(HttpMethod.DELETE, "/api/**").authenticated()
        .requestMatchers(HttpMethod.PATCH, "/api/**").authenticated()
        .anyRequest().permitAll())
        .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
    return http.build();
  }

  @Bean
  public TokenDecoder tokenDecoder() {
    return new JWTTokenDecoder();
  }

  @Bean
  public BCryptPasswordEncoder bCryptPasswordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public JwtAuthenticationFilter jwtAuthenticationFilter() {
    return new JwtAuthenticationFilter();
  }
}
