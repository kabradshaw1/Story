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

@DataJpaTest
@TestPropertySource(locations = "classpath:application-test.properties")
public class CharacterRepositoryTest {
  
	@Autowired
	private CharacterRepository characterRepository;

	@Autowired
	private TestEntityManager entityManager;

	private Character character;

	@BeforeEach
	void setup() {
		character = new Character();
		character.setBody("test body");
		character.setTitle("test title");
		entityManager.persistAndFlush(character);
	}

	@Test
	void givenTitle_whenFindByTitle_thenReturnsCharacter() {
		Optional<Character> retrievedCharacter = characterRepository.findByTitle("test title");
		assertTrue((retrievedCharacter.isPresent()));
		assertEquals("test body", retrievedCharacter.get().getBody());
	}

}
