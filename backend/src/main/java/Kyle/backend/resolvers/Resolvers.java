package Kyle.backend.resolvers;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import Kyle.backend.dao.CharacterRepository;
import Kyle.backend.entity.Character;

@Controller
@CrossOrigin( origins = "http://localhost:4200" )
public class Resolvers {


  private final CharacterRepository characterRepository;

  public Resolvers(CharacterRepository characterRepository) {
    this.characterRepository = characterRepository;
  }

  @QueryMapping
  public Character character(@Argument String title) {

    return characterRepository.findByTitle(title)
      .orElseThrow(() -> new IllegalArgumentException("Character not found"));
  }
}