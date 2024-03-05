package Kyle.backend.service;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import Kyle.backend.config.CustomUserPrincipal;
import Kyle.backend.dao.UserRepository;
import Kyle.backend.entity.User;

public class CustomUserDetailsService  implements UserDetailsService{

  @Autowired
  private UserRepository userRepository;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User user = userRepository.findByUsername(username)
      .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));

    // Assuming User entity has the roles set up appropriately
    String role = user.getIsAdmin() ? "ROLE_ADMIN" : "ROLE_USER";
    GrantedAuthority authority = new SimpleGrantedAuthority(role);

    return new CustomUserPrincipal(user.getUsername(), user.getId(), Collections.singletonList(authority));
  }

}
