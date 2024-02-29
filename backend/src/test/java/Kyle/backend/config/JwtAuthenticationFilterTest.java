package Kyle.backend.config;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import Kyle.backend.service.JwtService;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(SpringExtension.class)
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

  @Test
  public void givenNoToken_whenAcessingUnrestrictedEndPoint_thenAccessAppoved() {

  }

  @Test
  public void givenValidToken_whenAccessingRestrictedEndPoint_thenAccessApproved() throws Exception {
    when(jwtService.validateToken("valid.token")).thenReturn(true);


    mockMvc.perform(post("/api/test/protected")
      .header("Authorization", "Bearer valid.token"))
      .andExpect(status().isOk());

    verify(jwtService).validateToken("valid.token");
  }

  @RestController
  public static class TestController {
    @PostMapping("/test/protected")
    public ResponseEntity<String> protectedEndpoint() {
      return ResponseEntity.ok("Access Granted");
    }
  }
}

// @Test
// public void giveNoToken_whenAccessingRestrictedEndpoint_thenAccessDenied() throws Exception {

//   mockMvc.perform(post("/test/protected"))
//     .andExpect(status().isForbidden());
// }

// @Test
// public void givenNoToken_whenAcessingUnrestrictedEndPoint_thenAccessAppoved() {

// }
// @Test
// public void givenValidToken_whenAccessingRestrictedEndPoint_thenAccessApproved() throws Exception {
//   when(jwtService.validateToken("valid.token")).thenReturn(true);

//   mockMvc.perform(post("/test/protected")
//     .header("Authorization", "Bearer valid.token"))
//     .andExpect(status().isOk());

//   verify(jwtService).validateToken("valid.token");
// }