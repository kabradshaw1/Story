package Kyle.backend.config;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import Kyle.backend.service.JwtService;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Collections;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class JwtAuthenticationFilterTest {

  @Autowired
  private MockMvc mockMvc;

  @MockBean
  private JwtService jwtService;

  @Test
  public void givenInvlidToken_whenAccessingRestrictedEndPoint_thenAccessDenied() throws Exception {
    when(jwtService.validateToken("invalid.token")).thenReturn(false);

    mockMvc.perform(post("/api/test/protected")
      .header("Authorization", "Bearer invalid.token"))
      .andExpect(status().isForbidden());
  }

  @Test
  public void giveNoToken_whenAccessingRestrictedEndpoint_thenAccessDenied() throws Exception {

    mockMvc.perform(post("/api/test/protected"))
      .andExpect(status().isForbidden());
  }

  public void givenValidTokenAndMissingBody_whenAccessingRestrictedEndPoint_thenBadRequest() throws Exception {
    when(jwtService.validateToken("valid.token")).thenReturn(true);

    Authentication authentication = new UsernamePasswordAuthenticationToken(
      "TestUser",
      null,
      Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"))
    );
    when(jwtService.getAuthentication("valid.token")).thenReturn(authentication);

    mockMvc.perform(post("/api/characters")
      .header("Authorization", "Bearer valid.token"))
      .andExpect(status().isBadRequest()); // Expecting 400 due to missing body
  }
}