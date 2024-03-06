package Kyle.backend.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Collections;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
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
  public void given_when_then() throws Exception {
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
    assertEquals(1L, optionalCharacter.get().getUserId());
  }
}
