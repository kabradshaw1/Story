package Kyle.backend.config;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.Collections;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.context.annotation.Import;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import Kyle.backend.entity.Character;
import Kyle.backend.entity.User;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Import(DataJpaConfig.class)
public class DataJpaConfigTest {

  @BeforeEach
  void setUp() {

  }

  @Autowired
  private TestEntityManager entityManager;

  @Test
  public void givenProperInputs_whenUserSavedEntity_thenAuditedFieldsAreSet() {
    User newUser = new User();
    newUser.setUsername("TestUser");
    newUser.setPassword("password");
    newUser.setEmail("Test@Example.com");

    User savedUser = entityManager.persistFlushFind(newUser);

    assertNotNull(savedUser.getDateCreated());
  }

  @Test
  public void given_when_then() {

    SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
    CustomUserPrincipal principal = new CustomUserPrincipal("TestUser", 1L, Collections.emptyList());
    org.springframework.security.core.Authentication authentication = new UsernamePasswordAuthenticationToken(principal, null, principal.getAuthorities());
    securityContext.setAuthentication(authentication);
    SecurityContextHolder.setContext(securityContext);

    Character newCharacter = new Character();
    newCharacter.setBio("test bio");
    newCharacter.setName("Test");

    Character savedCharacter = entityManager.persistFlushFind(newCharacter);

    assertNotNull(savedCharacter.getUsername());
  }
}
