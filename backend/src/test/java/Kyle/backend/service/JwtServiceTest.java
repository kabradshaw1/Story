package Kyle.backend.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Date;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;

import Kyle.backend.dao.UserRepository;
import Kyle.backend.entity.User;

@ExtendWith(MockitoExtension.class)
public class JwtServiceTest {

  @Mock
  private UserRepository userRepository;

  @InjectMocks
  private JwtService jwtService;

  private User user;

  @BeforeEach
  private void setup() {
    user = new User();
    user.setUsername("testUser");
    user.setId(1L);
  }

  @Test
  public void givenUser_whenGenerateAccessToken_thenReturnAccessToken() {
    // Given
    // ... setup in @BeforeEach method

    // When
    String token = jwtService.generateAccessToken(user);

    // Then
    assertNotNull(token);

    DecodedJWT decodedJWT = JWT.decode(token);

    assertEquals(user.getId(), decodedJWT.getClaim("id").asLong());
    assertEquals(user.getUsername(), decodedJWT.getClaim("username").asString());

    // My access token should last 15 minutes
    Date expiresAt = decodedJWT.getExpiresAt();
    long diff = expiresAt.getTime() - System.currentTimeMillis();
    long fifteenMinutesInMilliseconds = 15 * 60 * 1000; // 15 minutes in milliseconds

    assertTrue(diff <= fifteenMinutesInMilliseconds && diff > 0); // Assert that expiration is set correctly
  }

  @Test
  public void givenUser_whenGenerateRefreshToken_thenReturnRefreshToken() {
    // Given
    // ... setup in @BeforeEach method

    // When
    String token = jwtService.generateAccessToken(user);

    // Then
    assertNotNull(token);

    DecodedJWT decodedJWT = JWT.decode(token);

    assertEquals(user.getId(), decodedJWT.getClaim("id").asLong());
    assertEquals(user.getUsername(), decodedJWT.getClaim("username").asString());

    // My access token should last 15 minutes
    Date expiresAt = decodedJWT.getExpiresAt();
    long diff = expiresAt.getTime() - System.currentTimeMillis();
    long fifteenMinutesInMilliseconds = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

    assertTrue(diff <= fifteenMinutesInMilliseconds && diff > 0); // Assert that expiration is set correctly
  }

  @Test
  public void givenValidRefresh_whenRefreshAccessToken_thenReturnAccessToken() {

  }
}
