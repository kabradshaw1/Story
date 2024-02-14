package Kyle.backend.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import Kyle.backend.dao.CharacterRepository;
import Kyle.backend.entity.Character;
import Kyle.backend.entity.Scene;

@ExtendWith(MockitoExtension.class)
public class CharacterServiceTest {
  @Mock
  private CharacterRepository characterRepository;

  @InjectMocks
  private CharacterService characterService;

  private Character character;

  @BeforeEach
  private void setup() {
    character = new Character("testName", "testBio");
    Set<Scene> scenes = new HashSet<>();
    Scene scene = new Scene();
    scene.setTitle("Scene 1");
    scenes.add(scene);

    character.setScenes(scenes);
  }

  @Test
  public void given_whenCharactersSearched_thenReturnCharacters() {
    // Given
    // When
    // Then
  }

  @Test
  public void givenCharacterExists_whenCharacterSearched_thenReturnCharacter() {
    // Given
    String name = "testName";
    // when(characterRepository.findByName(name)).thenReturn(Optional.of(character));

    // When
    Character foundCharacter = characterService.findByName(name);

    // Then
    assertNotNull(foundCharacter, "The found character should not be null.");
    assertEquals(name, foundCharacter.getName(), "The name of the found character should match the search query.");
    assertNotNull(foundCharacter.getScenes(), "The character should have associated scenes.");
    assertEquals(1, foundCharacter.getScenes().size(), "The character should have one associated scene.");
  }

  @Test
  public void givenCharacterDoesNotExist_whenCharacterSearched_thenThrowException() {
    // Given
    // When
    // Then
  }
}
