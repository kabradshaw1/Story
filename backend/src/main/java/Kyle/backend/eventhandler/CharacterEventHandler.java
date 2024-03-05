package Kyle.backend.eventhandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.core.annotation.HandleBeforeCreate;
import org.springframework.data.rest.core.annotation.HandleBeforeSave;
import org.springframework.data.rest.core.annotation.RepositoryEventHandler;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import Kyle.backend.dao.UserRepository;
import Kyle.backend.entity.Character;
import Kyle.backend.entity.User;

@Component
@RepositoryEventHandler
public class CharacterEventHandler {

  @Autowired
  private UserRepository userRepository;

  @HandleBeforeCreate
  @HandleBeforeSave
  public void HandleCharacterSave(Character character) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if(authentication != null && !(authentication instanceof AnonymousAuthenticationToken)) {
      String currentUserName = authentication.getName();
      User user = userRepository.findByUsername(currentUserName).orElse(null);
      if (user != null) {
        character.setUserId(user.getId());
      }
    }
  }
}
