package Kyle.backend.controller;

import Kyle.backend.dto.LoginRequest;
import Kyle.backend.dto.TokenResponse;
import Kyle.backend.entity.User;
import Kyle.backend.service.JwtService;
import Kyle.backend.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin( origins = "http://localhost:4200" )
public class LoginController {

  @Autowired
  private UserService userService;

  @Autowired
  private JwtService jwtService;

  @PostMapping("/api/login/")
  public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {
    User user = userService.validateUserCredentials(loginRequest.getEmail(), loginRequest.getPassword());

    if(user == null) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials.");
    }

    String accessToken = jwtService.generateAccessToken(user);
    String refreshToken = jwtService.generateRefreshToken(user);

    Cookie refreshTokenCookie = new Cookie("refreshToken", refreshToken);
    refreshTokenCookie.setHttpOnly(true);
    refreshTokenCookie.setPath("/api/refresh");
    response.addCookie(refreshTokenCookie);

    return ResponseEntity.ok(new TokenResponse(accessToken));
  }
}
