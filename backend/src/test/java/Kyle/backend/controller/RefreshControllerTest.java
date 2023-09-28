package Kyle.backend.controller;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;



import Kyle.backend.service.JwtService;
import jakarta.servlet.http.Cookie;

@SpringBootTest
@AutoConfigureMockMvc
public class RefreshControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @MockBean JwtService jwtService;

  @Test
  public void refreshAccessToken() throws Exception {
    // Given
    String dummyToken = "DummyRefreshToken";
    String dummyNewAccessToken = "dummyNewAccessToken";

    when(jwtService.refreshAccessToken(dummyToken)).thenReturn(dummyNewAccessToken);

    // When & Then
    mockMvc.perform(
      MockMvcRequestBuilders.post("/api/refresh/")
        .cookie(new Cookie("refreshToken", dummyToken))
    )
      .andExpect(status().isOk())
      .andExpect(content().string(dummyNewAccessToken));

    verify(jwtService).refreshAccessToken(dummyToken);
  }
}
