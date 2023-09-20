package Kyle.backend.service;

import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

import Kyle.backend.entity.User;

@Service
public class JwtService {

  private final String SECRET = "mySuperSecretKey";

  public String generateToken(User user) {
    Algorithm algorithm = Algorithm.HMAC256(SECRET);
    return JWT.create()
      .withClaim("username", user.getUsername())
      .withClaim("email", user.getEmail())
      .withIssuer("backend")
      .sign(algorithm);
  }
}
