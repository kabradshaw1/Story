package Kyle.backend.service;

import java.util.Date;
import java.util.Optional;
import java.util.List;
import java.util.ArrayList;

import Kyle.backend.dao.UserRepository;
import Kyle.backend.entity.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;

@Service
public class JwtService {

  @Autowired
  private UserRepository userRepository;

  private final String SECRET = "mySuperSecretKey";
  private final int ACCESS_TOKEN_EXPIRATION = 15 * 60 * 1000; // 15 minutes in milliseconds
  private final int REFRESH_TOKEN_EXPIRATION = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
  private Algorithm algorithm = Algorithm.HMAC256(SECRET);
  private TokenDecoder tokenDecoder = new JWTTokenDecoder();

  // This is needed for the test
  public void setTokenDecoder(TokenDecoder tokenDecoder) {
    this.tokenDecoder = tokenDecoder;
  }

  public String generateAccessToken(User user) {

    return JWT.create()
        .withClaim("username", user.getUsername())
        .withClaim("id", user.getId())
        .withClaim("isAdmin", user.getIsAdmin())
        .withIssuer("backend")
        .withExpiresAt(new Date(System.currentTimeMillis() + ACCESS_TOKEN_EXPIRATION))
        .sign(algorithm);
  }

  public String generateRefreshToken(User user) {

    return JWT.create()
        .withClaim("id", user.getId())
        .withIssuer("backend")
        .withExpiresAt(new Date(System.currentTimeMillis() + REFRESH_TOKEN_EXPIRATION))
        .sign(algorithm);
  }

  public String refreshAccessToken(String refreshToken) {
    try {
      DecodedJWT decodedJWT = JWT.require(Algorithm.HMAC256(SECRET))
          .build()
          .verify(refreshToken);

      Long id = decodedJWT.getClaim("id").asLong();

      Optional<User> userOptional = userRepository.findById(id);
      if (userOptional.isPresent()) {
        User user = userOptional.get();
        return JWT.create()
            .withClaim("username", user.getUsername())
            .withClaim("id", user.getId())
            .withClaim("isAdmin", user.getIsAdmin())
            .withIssuer("backend")
            .withExpiresAt(new Date(System.currentTimeMillis() + ACCESS_TOKEN_EXPIRATION))
            .sign(algorithm);
      } else {
        return "User was not found";
      }

    } catch (Exception e) {
      // Handle various exceptions like TokenExpiredException,
      // SignatureVerificationException, etc.
      throw new RuntimeException("Invalid refresh token", e);
    }
  }

  private JWTVerifier verifier = JWT.require(algorithm)
      .withIssuer("backend")
      .build();

  public boolean validateToken(String token) {
    try {
      verifier.verify(token);
      return true;
    } catch (JWTVerificationException e) {
      return false;
    }
  }

  public Authentication getAuthentication(String token) {
    DecodedJWT jwt = tokenDecoder.decode(token);

    String username = jwt.getClaim("username").asString();
    boolean isAdmin = jwt.getClaim("isAdmin").asBoolean();

    List<SimpleGrantedAuthority> authorities = new ArrayList<>();
    if (isAdmin) {
      authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
    } else {
      authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
    }
    // Using fully qualified name for Spring Security's User
    org.springframework.security.core.userdetails.User principal = new org.springframework.security.core.userdetails.User(
        username, "", authorities);

    return new UsernamePasswordAuthenticationToken(principal, null, authorities);
  }

  // Added this so I could mock this in the test
  public interface TokenDecoder {
    DecodedJWT decode(String token);
  }

  public static class JWTTokenDecoder implements TokenDecoder {
    @Override
    public DecodedJWT decode(String token) {
      return JWT.decode(token);
    }
  }
}