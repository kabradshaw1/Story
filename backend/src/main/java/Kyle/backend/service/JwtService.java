package Kyle.backend.service;

import java.util.Date;

import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

import Kyle.backend.entity.User;

@Service
public class JwtService {

  private final String SECRET = "mySuperSecretKey";
  private final int ACCESS_TOKEN_EXPIRATION = 15 * 60 * 1000; // 15 minutes in milliseconds
  private final int REFRESH_TOKEN_EXPIRATION = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

  public String generateAccessToken(User user) {
    Algorithm algorithm = Algorithm.HMAC256(SECRET);
    return JWT.create()
      .withClaim("username", user.getUsername())
      .withClaim("email", user.getEmail())
      .withIssuer("backend")
      .withExpiresAt(new Date(System.currentTimeMillis() + ACCESS_TOKEN_EXPIRATION))
      .sign(algorithm);
  }

  public String generateRefreshToken(User user) {
    Algorithm algorithm = Algorithm.HMAC256(SECRET);
    return JWT.create()
      .withClaim("username", user.getUsername())
      .withClaim("email", user.getEmail())
      .withIssuer("backend")
      .withExpiresAt(new Date(System.currentTimeMillis() + REFRESH_TOKEN_EXPIRATION))
      .sign(algorithm);
  }
}

