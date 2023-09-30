package Kyle.backend.service;

import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;

import Kyle.backend.dao.UserRepository;
import Kyle.backend.entity.User;

@Service
public class JwtService {

  @Autowired
  private UserRepository userRepository;

  private final String SECRET = "mySuperSecretKey";
  private final int ACCESS_TOKEN_EXPIRATION = 15 * 60 * 1000; // 15 minutes in milliseconds
  private final int REFRESH_TOKEN_EXPIRATION = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds
  private Algorithm algorithm = Algorithm.HMAC256(SECRET);

  public String generateAccessToken(User user) {

    return JWT.create()
      .withClaim("username", user.getUsername())
      .withClaim("id", user.getId())
      .withIssuer("backend")
      .withExpiresAt(new Date(System.currentTimeMillis() + ACCESS_TOKEN_EXPIRATION))
      .sign(algorithm);
  }

  public String generateRefreshToken(User user) {

    return JWT.create()
      .withClaim("username", user.getUsername())
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
        if(userOptional.isPresent()) {
          User user = userOptional.get();
          return JWT.create()
            .withClaim("username", user.getUsername())
            .withClaim("id", user.getId())
            .withIssuer("backend")
            .withExpiresAt(new Date(System.currentTimeMillis() + ACCESS_TOKEN_EXPIRATION))
            .sign(algorithm);
         } else {
          return "User was not found";
         }

    } catch (Exception e) {
      // Handle various exceptions like TokenExpiredException, SignatureVerificationException, etc.
      throw new RuntimeException("Invalid refresh token", e);
    }
  }
}

