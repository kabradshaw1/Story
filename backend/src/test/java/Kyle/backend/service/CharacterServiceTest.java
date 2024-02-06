package Kyle.backend.service;

import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import Kyle.backend.dao.CharacterRepository;
import Kyle.backend.entity.Character;

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
  }

  @Test
  public void givenCharacterExists_whenCharacterSearched_thenReturnCharacter() {
    // Given
    String name = "testName";

    // When
    when(null)
    // Then
  }
}
