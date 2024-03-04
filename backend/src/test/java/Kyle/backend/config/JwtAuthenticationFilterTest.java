package Kyle.backend.config;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.test.web.servlet.MockMvc;

import Kyle.backend.service.JwtService;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Collections;

@SpringBootTest
@AutoConfigureMockMvc
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

  // This solution to how to test that a valid key would allow access to an endpoint is probably not ideal.
  // I tried to create a mock end point with restircted access, but I was unable to get it to load when I included
  // it here in the JwtAuthFilterTest class.  I decided to avoid using an actual endpoint, even though they load
  // with the way this test is setup.  I worry that testing with an actual endpoint will cause issues when I change
  // end points as I work on the app.
  @Test
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
