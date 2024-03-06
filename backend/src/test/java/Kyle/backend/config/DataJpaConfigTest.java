package Kyle.backend.config;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.context.annotation.Import;

import Kyle.backend.entity.Character;
import Kyle.backend.entity.User;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Import(DataJpaConfig.class)
public class DataJpaConfigTest {

  @Autowired
  private TestEntityManager entityManager;

  @Test
  public void given_whenSavedEntity_thenAuditedFieldsAreSet() {
    User newUser = new User();
    newUser.setUsername("TestUser");
    newUser.setPassword("password");
    newUser.setEmail("Test@Example.com");

    User savedUser = entityManager.persistFlushFind(newUser);

    assertNotNull(savedUser.getDateCreated());
    Character newCharacter = new Character();
    newCharacter.setBio("test bio");
    newCharacter.setName("Test");

    Character savedCharacter = entityManager.persistFlushFind(newCharacter);

    assertNotNull(savedCharacter.getUserId());
  }
}
