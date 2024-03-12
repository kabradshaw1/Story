package Kyle.backend.eventhandler;

import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.HandleBeforeDelete;
import org.springframework.data.rest.core.annotation.HandleBeforeSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import Kyle.backend.config.CustomUserPrincipal;
import Kyle.backend.entity.Scene;

@Component
@RepositoryEventHandler
public class SceneEventHandler {

  @HandleBeforeCreate
  @HandleBeforeSave
  public void HandleSceneSave(Scene scene) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if(authentication != null && !(authentication instanceof AnonymousAuthenticationToken)) {
      String currentUserName = authentication.getName();
      scene.setUsername(currentUserName);
    }
  }
  @HandleBeforeDelete
  public void handleSceneDelete(Scene scene) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String currentUsername = ((CustomUserPrincipal) authentication.getPrincipal()).getUsername();

    if (!scene.getUsername().equals(currentUsername) && authentication.getAuthorities().stream().noneMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_ADMIN"))) {
      throw new AccessDeniedException("Not authorized to delete this scene");
    }
  }
}
