package Kyle.backend.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Collections;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;

import Kyle.backend.config.CustomUserPrincipal;
import Kyle.backend.dao.CharacterRepository;
import Kyle.backend.entity.Character;
import Kyle.backend.service.JwtService;

@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource(locations = "classpath:application-test.properties")
public class CharacterControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private CharacterRepository characterRepository;

  @MockBean
  private JwtService jwtService;

  @SuppressWarnings("null")
  @Test
  public void givenAuthUser_whenCharacterPost_thenCreatePost() throws Exception {
    when(jwtService.validateToken("valid.token")).thenReturn(true);

    String body = """
      {
        "name": "string",
        "bio": "string"
      }
      """;

    CustomUserPrincipal principal = new CustomUserPrincipal(
      "username",
      1L,
      Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"))
    );

    Authentication authentication = new UsernamePasswordAuthenticationToken(
      principal,
      null,
      Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"))
    );
    when(jwtService.getAuthentication("valid.token")).thenReturn(authentication);

    mockMvc.perform(post("/api/characters")
      .contentType(MediaType.APPLICATION_JSON)
      .header("Authorization", "Bearer valid.token")
      .content(body))
      .andExpect(status().isCreated());

    // Verify the character is in the database
    Optional<Kyle.backend.entity.Character> optionalCharacter = characterRepository.name("string");
    assertTrue(optionalCharacter.isPresent());
    assertEquals("string", optionalCharacter.get().getBio());
    assertEquals("username", optionalCharacter.get().getUsername());
  }

  @Test
  public void givenWrongAuthUser_whenDeletingPost_thenReturnError() throws Exception {
    // Mocks making it past the JwtAuthFilter
    when(jwtService.validateToken("valid.token")).thenReturn(true);

    // Create a character in the mocked database.  This is all I need to locate a character
    // and verify that it was made by the person that is authenticated
    Character existingCharacter = new Character();
    existingCharacter.setId(1L);
    existingCharacter.setUsername("Tester");
    Character savedCharacter = characterRepository.save(existingCharacter);
    assertNotNull(savedCharacter.getId());

    // Mocks use of JwtService.getAuth()
    CustomUserPrincipal principal = new CustomUserPrincipal(
      "WrongUsername",
      1L,
      Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"))
    );
    Authentication authentication = new UsernamePasswordAuthenticationToken(
      principal,
      null,
      Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"))
    );
    when(jwtService.getAuthentication("valid.token")).thenReturn(authentication);

    // Test that delete doesn't work
    mockMvc.perform(delete("/api/characters/1")
      .header("Authorization", "Bearer valid.token"))
      .andExpect(status().isForbidden());
  }
}
