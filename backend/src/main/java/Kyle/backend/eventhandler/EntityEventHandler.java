package Kyle.backend.eventhandler;

import org.springframework.data.rest.core.annotation.*;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import Kyle.backend.config.CustomUserPrincipal;
import Kyle.backend.entity.Ownable; // This is an interface that your entities would need to implement

@Component
@RepositoryEventHandler
public class EntityEventHandler {

    // @HandleBeforeCreate
    // @HandleBeforeSave
    // public <T extends Ownable> void handleSave(T entity) {
    //     Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    //     if (authentication != null && isAuthenticated(authentication)) {
    //         String currentUserName = ((CustomUserPrincipal) authentication.getPrincipal()).getUsername();
    //         entity.setUsername(currentUserName);
    //     }
    // }

    // @HandleBeforeDelete
    // public <T extends Ownable> void handleDelete(T entity) {
    //     Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    //     if (!isAuthorizedToDelete(entity, authentication)) {
    //         throw new AccessDeniedException("Not authorized to delete this entity");
    //     }
    // }

    // private boolean isAuthenticated(Authentication authentication) {
    //     return authentication != null && !(authentication instanceof AnonymousAuthenticationToken);
    // }

    // private <T extends Ownable> boolean isAuthorizedToDelete(T entity, Authentication authentication) {
    //     if (authentication == null || !isAuthenticated(authentication)) {
    //         return false;
    //     }

    //     String currentUsername = ((CustomUserPrincipal) authentication.getPrincipal()).getUsername();
    //     boolean isAdmin = authentication.getAuthorities().stream()
    //             .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_ADMIN"));

    //     return entity.getUsername().equals(currentUsername) || isAdmin;
    // }
}
