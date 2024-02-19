package Kyle.backend.config;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import Kyle.backend.service.JwtService;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


public class JwtAuthenticationFilterTest {

  private MockMvc mockMvc;

  @Mock
  private JwtService jwtService;

  @InjectMocks
  private JwtAuthenticationFilter jwtAuthenticationFilter;

  @BeforeEach
  public void setup() {
    when(jwtService.validateToken("valid.token")).thenReturn(true);
    when(jwtService.validateToken("invalid.token")).thenReturn(false);

    mockMvc = MockMvcBuilders
      .standaloneSetup(new TestController()) // Use a minimal controller for testing
      .addFilters(jwtAuthenticationFilter) // Add your JwtAuthenticationFilter
      .build();
  }

  @Test
  public void shouldCallJwtServiceToValidateToken() throws Exception {
    // Execute the filter (as in previous examples)

    // Verify that JwtService.validateToken was called with the expected token
    verify(jwtService).validateToken("valid.token");
  }

  @Test
  public void giveNoToken_whenAccessingRestrictedEndpoint_thenAccessDenied() throws Exception {
    MockHttpServletRequest request = new MockHttpServletRequest();
    request.addHeader("Authorization", "Bearer invalid.token");
    mockMvc.perform(post("/test/protected"))
      .andExpect(status().isForbidden()); // or isUnauthorized(), depending on your filter's behavior
  }

  @Test
  public void givenInvlidToken_whenAccessingRestrictedEndPoint_thenAccessDenied() throws Exception {

  }

  @Test
  public void givenValidToken_whenAccessingRestrictedEndPoint_thenAccessApproved() {

  }

  @Test
  public void givenNoToken_whenAcessingUnrestrictedEndPoint_thenAccessAppoved() {

  }

  @RestController
  public static class TestController {
    @GetMapping("/test/protected")
    public ResponseEntity<String> protectedEndpoint() {
      return ResponseEntity.ok("Access Granted");
    }
  }
}
