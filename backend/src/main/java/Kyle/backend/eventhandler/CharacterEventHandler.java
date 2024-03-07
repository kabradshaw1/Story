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
import Kyle.backend.entity.Character;

@Component
@RepositoryEventHandler
public class CharacterEventHandler {

  @HandleBeforeCreate
  @HandleBeforeSave
  public void HandleCharacterSave(Character character) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if(authentication != null && !(authentication instanceof AnonymousAuthenticationToken)) {
      String currentUserName = authentication.getName();
      character.setUsername(currentUserName);
    }
  }
  @HandleBeforeDelete
  public void handleCharacterDelete(Character character) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String currentUsername = ((CustomUserPrincipal) authentication.getPrincipal()).getUsername();

    if (!character.getUsername().equals(currentUsername) && authentication.getAuthorities().stream().noneMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_ADMIN"))) {
      throw new AccessDeniedException("Not authorized to delete this character");
    }
  }
}
