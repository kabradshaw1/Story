package Kyle.backend.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;

import com.auth0.jwt.JWT;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import Kyle.backend.dao.UserRepository;
import Kyle.backend.entity.User;

@ExtendWith(MockitoExtension.class)
public class JwtServiceTest {

  @Mock
  private UserRepository userRepository;

  @Mock
  private JwtService.TokenDecoder tokenDecoder;

  @InjectMocks
  private JwtService jwtService;

  private User user;

  @BeforeEach
  private void setup() {
    user = new User();
    user.setUsername("testUser");
    user.setId(1L);
    jwtService.setTokenDecoder(tokenDecoder);
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

    // My refresh token should last 7 days
    Date expiresAt = decodedJWT.getExpiresAt();
    long diff = expiresAt.getTime() - System.currentTimeMillis();
    long fifteenMinutesInMilliseconds = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

    assertTrue(diff <= fifteenMinutesInMilliseconds && diff > 0); // Assert that expiration is set correctly
  }

  @Test
  public void givenRefresh_whenRefreshAccessToken_thenReturnAccessToken() {
    // Given
    String refreshToken = jwtService.generateRefreshToken(user);
    Mockito.when(userRepository.findById(user.getId())).thenReturn(Optional.of(user));

    // When
    String newAccessToken = jwtService.refreshAccessToken(refreshToken);

    // Then
    assertNotNull(newAccessToken);
    DecodedJWT decodedJWT = JWT.decode(newAccessToken);

    assertEquals(user.getId(), decodedJWT.getClaim("id").asLong());
    assertEquals(user.getUsername(), decodedJWT.getClaim("username").asString());

    Date expiresAt = decodedJWT.getExpiresAt();
    long diff = expiresAt.getTime() - System.currentTimeMillis();
    long fifteenMinutesInMilliseconds = 15 * 60 * 1000; // 15 minutes in milliseconds

    assertTrue(diff <= fifteenMinutesInMilliseconds && diff > 0); // Assert that expiration is set correctly
  }

  @Test
  public void givenInvalidRefresh_whenRefreshAccessToken_thenReturnError() {
    // Given
    String invalidRefreshToken = "invalidToken";

    // When & Then
    Exception exception = assertThrows(RuntimeException.class, () -> {
      jwtService.refreshAccessToken(invalidRefreshToken);
    });

    assertTrue(exception.getMessage().contains("Invalid refresh token"));
  }
  // I have skipped writing tests for an invalid token being pass to the getAuthentication method for now
  @Test
  public void givenValidAdminToken_whenGetAuthentication_thenReturnAmdinAuthentication() {

    String token = "dummyTokenForTest";
    DecodedJWT mockedDecodedJWT = Mockito.mock(DecodedJWT.class);

    Mockito.when(tokenDecoder.decode(token)).thenReturn(mockedDecodedJWT); // Mock the behavior of decode
    Mockito.when(mockedDecodedJWT.getClaim("username")).thenReturn(new ClaimMock("testUser"));
    Mockito.when(mockedDecodedJWT.getClaim("isAdmin")).thenReturn(new ClaimMock(true));
    Mockito.when(mockedDecodedJWT.getClaim("user_id")).thenReturn(new ClaimMock(1L));

    // Perform the action
    Authentication authentication = jwtService.getAuthentication(token);

    // Verify the results
    assertNotNull(authentication);
    assertEquals(user.getUsername(), authentication.getName());
    assertTrue(authentication.getAuthorities().stream()
      .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_ADMIN")));
  }

  @Test
  public void givenValidNonAdminToken_whenGetAuthentication_thenReturNonAmdinAuthentication() {
    String token = "dummyTokenForTest";
    DecodedJWT mockedDecodedJWT = Mockito.mock(DecodedJWT.class);

    Mockito.when(tokenDecoder.decode(token)).thenReturn(mockedDecodedJWT); // Mock the behavior of decode
    Mockito.when(mockedDecodedJWT.getClaim("username")).thenReturn(new ClaimMock("testUser"));
    Mockito.when(mockedDecodedJWT.getClaim("isAdmin")).thenReturn(new ClaimMock(false));
    Mockito.when(mockedDecodedJWT.getClaim("user_id")).thenReturn(new ClaimMock(1L));

    // Perform the action
    Authentication authentication = jwtService.getAuthentication(token);

    // Verify the results
    assertNotNull(authentication);
    assertEquals(user.getUsername(), authentication.getName());
    assertFalse(authentication.getAuthorities().stream()
      .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_ADMIN")));
  }

  // Mock implementation for Claim, as Claim is a final class and its methods are final too.
  private static class ClaimMock implements Claim {
    private final Object value;

    public ClaimMock(Object value) {
      this.value = value;
    }

    @Override
    public boolean isNull() {
      return value == null;
    }

    @Override
    public Boolean asBoolean() {
      return (Boolean) value;
    }

    @Override
    public Integer asInt() {
      return (Integer) value;
    }

    @Override
    public Long asLong() {
      return (Long) value;
    }

    @Override
    public Double asDouble() {
      return (Double) value;
    }

    @Override
    public String asString() {
      return (String) value;
    }

    @Override
    public Date asDate() {
      return (Date) value;
    }

    @SuppressWarnings("unchecked")
    @Override
    public <T> T[] asArray(Class<T> tClazz) throws JWTDecodeException {
      return (T[]) value;
    }

    @Override
    public <T> T as(Class<T> tClazz) throws JWTDecodeException {
      return tClazz.cast(value);
    }

    @Override
    public <T> List<T> asList(Class<T> tClazz) throws JWTDecodeException {
      // TODO Auto-generated method stub
      throw new UnsupportedOperationException("Unimplemented method 'asList'");
    }

    @Override
    public Map<String, Object> asMap() throws JWTDecodeException {
      // TODO Auto-generated method stub
      throw new UnsupportedOperationException("Unimplemented method 'asMap'");
    }
  }
}
