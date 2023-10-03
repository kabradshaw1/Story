package Kyle.backend.controller;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import Kyle.backend.entity.User;
import Kyle.backend.service.JwtService;
import Kyle.backend.service.UserService;
import jakarta.servlet.http.Cookie;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@AutoConfigureMockMvc
public class LoginControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @MockBean
  private JwtService jwtService;

  @MockBean
  private UserService userService;

  private User user;

  @BeforeEach
  private void setup() {
      user = new User("testUser", "testPassword", "test@example.com");
    }

  @Test
  public void returnsTokensIfCredentialsAreCorrect() throws Exception {
    // Given
    String password = "testPassword";
    String email = "test@example.com";

    String dummyRefreshToken = "dummyRefreshToken";
    String dummyAccessToken = "dummyAccessToken";

    when(userService.validateUserCredentials(email, password)).thenReturn(user);
    when(jwtService.generateAccessToken(user)).thenReturn(dummyAccessToken);
    when(jwtService.generateRefreshToken(user)).thenReturn(dummyRefreshToken);

    // When & Then
    MvcResult result = mockMvc.perform(
      MockMvcRequestBuilders.post("/api/login/")
      .contentType(MediaType.APPLICATION_JSON)
      .content("{\"email\":\"" + email + "\", \"password\":\"" + password + "\"}")
    )
      .andExpect(status().isOk())
      .andExpect(jsonPath("$.accessToken").value(dummyAccessToken))
      .andReturn();

    Cookie responseCookie = result.getResponse().getCookie("refreshToken");
    assertNotNull(responseCookie);
    assertEquals("dummyRefreshToken", responseCookie.getValue());

    verify(jwtService).generateAccessToken(user);
    verify(jwtService).generateRefreshToken(user);
  }

  @Test
  public void returnsErrorIfCredentialsAreIncorrect() {
    
  }
}
