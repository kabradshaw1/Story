package Kyle.backend.config;

import java.util.Optional;

import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class SpringSecurityAuditorAware implements AuditorAware<Long> {

  @SuppressWarnings("null")
  @Override
  public Optional<Long> getCurrentAuditor() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

    if (authentication == null || !authentication.isAuthenticated()) {
      return Optional.empty();
    }

    Object principal = authentication.getPrincipal();

    if (principal instanceof CustomUserPrincipal) {
      CustomUserPrincipal customUserPrincipal = (CustomUserPrincipal) principal;
      return Optional.ofNullable(customUserPrincipal.getUserId());
    }
    return Optional.empty();
  }
}