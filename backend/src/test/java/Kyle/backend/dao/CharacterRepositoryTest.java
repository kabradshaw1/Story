package Kyle.backend.dao;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.TestPropertySource;

import Kyle.backend.entity.Character;
import Kyle.backend.entity.Scene;

@DataJpaTest
@TestPropertySource(locations = "classpath:application-test.properties")
public class CharacterRepositoryTest {
  
  @Autowired
  private CharacterRepository characterRepository;

  @Autowired
  private TestEntityManager entityManager;

  @BeforeEach
  void setup() {
    // Create and persist test Character
    Character character = new Character();
    // Assuming 'title' and 'body' are fields in Character, omitted here for brevity
    character.setTitle("test title");
    entityManager.persistAndFlush(character);

    // Create and persist test Scene
    Scene scene = new Scene();
    scene.setTitle("test scene");
    // Omitted additional Scene setup for brevity
    entityManager.persistAndFlush(scene);

    // Establish the many-to-many relationship
    character.getScenes().add(scene);
    scene.getCharacters().add(character);

    // Persist the entities again to save the relationship
    entityManager.persistAndFlush(scene);
    entityManager.persistAndFlush(character);
  }

  @Test
  void givenTitle_whenFindByTitle_thenReturnsCharacterWithScenes() {
    Optional<Character> retrievedCharacter = characterRepository.findByTitle("test title");
    assertTrue(retrievedCharacter.isPresent(), "Character should be found by title");

    Character character = retrievedCharacter.get();
    assertEquals("test title", character.getTitle(), "Character title should match");
    assertEquals(1, character.getScenes().size(), "Character should have one associated scene");

    Scene scene = character.getScenes().iterator().next();
    assertEquals("test scene", scene.getTitle(), "Scene title should match");
  }
}
