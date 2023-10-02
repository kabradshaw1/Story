package Kyle.backend.controller;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

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

  @MockBean
  private JwtService jwtService;

  @Test
  public void refreshAccessTokenWithRefreshToken() throws Exception {
    // Given
    String dummyRefreshToken = "DummyRefreshToken";
    String dummyNewAccessToken = "dummyNewAccessToken";

    when(jwtService.refreshAccessToken(dummyRefreshToken)).thenReturn(dummyNewAccessToken);

    // When & Then
    mockMvc.perform(
      MockMvcRequestBuilders.post("/api/refresh/")
        .cookie(new Cookie("refreshToken", dummyRefreshToken))
    )
      .andExpect(status().isOk())
      .andExpect(jsonPath("$.accessToken").value(dummyNewAccessToken));

    verify(jwtService).refreshAccessToken(dummyRefreshToken);
  }

  @Test
  public void returnsErrorWithoutValidRefreshToken() {

  }
}
