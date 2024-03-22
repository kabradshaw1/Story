package Kyle.backend.controller;

// import java.util.List;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
// import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import Kyle.backend.dao.CharacterRepository;
// import Kyle.backend.dao.SceneRepository;
import Kyle.backend.entity.Character;
// import Kyle.backend.entity.Scene;

@Controller
@CrossOrigin( origins = "http://localhost:4200" )
public class CharacterController {


  private final CharacterRepository characterRepository;

  // private final SceneRepository sceneRepository; SceneRepository sceneRepository

  public CharacterController(CharacterRepository characterRepository) {
    this.characterRepository = characterRepository;
    // this.sceneRepository = sceneRepository;
  }

  @QueryMapping
  public Character character(@Argument String title) {

    return characterRepository.findByTitle(title)
      .orElseThrow(() -> new IllegalArgumentException("Character not found"));
  }

  // @SchemaMapping
  // public List<Scene> scenes(Character character) {
  //   return sceneRepository.getById(character)
  // }
}