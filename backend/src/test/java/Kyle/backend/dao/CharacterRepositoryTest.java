package Kyle.backend.dao;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Collections;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.test.web.servlet.MockMvc;

import Kyle.backend.service.JwtService;

@SpringBootTest
@AutoConfigureMockMvc
public class CharacterRepositoryTest {

  @Autowired
  private MockMvc mockMvc;

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

    Authentication authentication = new UsernamePasswordAuthenticationToken(
      "TestUser",
      null,
      Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"))
    );
    when(jwtService.getAuthentication("valid.token")).thenReturn(authentication);

    mockMvc.perform(post("/api/characters")
      .contentType(MediaType.APPLICATION_JSON)
      .header("Authorization", "Bearer valid.token")
      .content(body))
      .andExpect(status().isOk());
  }
}
