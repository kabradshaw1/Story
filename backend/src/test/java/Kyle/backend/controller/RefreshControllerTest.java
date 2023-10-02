package Kyle.backend.controller;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
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

  @MockBean
  private JwtService jwtService;
  private String dummyRefreshToken = "DummyRefreshToken";
  private String dummyAccessToken = "dummyAccessToken";

  @Test
  public void refreshAccessTokenWithRefreshToken() throws Exception {
    // Given
    when(jwtService.refreshAccessToken(dummyRefreshToken)).thenReturn(dummyAccessToken);

    // When & Then
    mockMvc.perform(
      MockMvcRequestBuilders.post("/api/refresh/")
        .cookie(new Cookie("refreshToken", dummyRefreshToken))
    )
      .andExpect(status().isOk())
      .andExpect(jsonPath("$.accessToken").value(dummyAccessToken));

    verify(jwtService).refreshAccessToken(dummyRefreshToken);
  }

  @Test
  public void returnsErrorIfRefreshTokenIsMissing() throws Exception {
      // When & Then
      mockMvc.perform(MockMvcRequestBuilders.post("/api/refresh/"))
          .andExpect(status().isBadRequest())
          .andExpect(content().string("Refresh token not found"));
  }

  @Test
  public void returnsErrorIfRefreshTokenIsInvalid() throws Exception {
      // Given
      String invalidRefreshToken = "invalidRefreshToken";
      when(jwtService.refreshAccessToken(invalidRefreshToken)).thenThrow(new Exception("Invalid refresh token"));

      // When & Then
      mockMvc.perform(
        MockMvcRequestBuilders.post("/api/refresh/")
          .cookie(new Cookie("refreshToken", invalidRefreshToken))
      )
        .andExpect(status().isUnauthorized())
        .andExpect(content().string("Invalid refresh token"));

      verify(jwtService).refreshAccessToken(invalidRefreshToken);
  }

}
