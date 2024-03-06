package Kyle.backend.config;

import java.util.Optional;

import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class SpringSecurityAuditorAware implements AuditorAware<String> {

  @SuppressWarnings("null")
  @Override
  public Optional<String> getCurrentAuditor() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

    if (authentication == null || !authentication.isAuthenticated()) {
      return Optional.empty();
    }

    Object principal = authentication.getPrincipal();

    if (principal instanceof CustomUserPrincipal) {
      CustomUserPrincipal customUserPrincipal = (CustomUserPrincipal) principal;
      return Optional.ofNullable(customUserPrincipal.getUsername());
    }
    return Optional.empty();
  }
}