package Kyle.backend.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import Kyle.backend.service.JwtService;
import Kyle.backend.service.UserService;

@SpringBootTest
@AutoConfigureMockMvc
public class LoginControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @MockBean
  private JwtService jwtService;

  @MockBean
  private UserService userService;

  @Test
  public void returnsTokensIfCredentialsAreCorrect() {
    // Given
    
  }
}
