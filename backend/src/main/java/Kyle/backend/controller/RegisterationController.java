package Kyle.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import Kyle.backend.entity.User;
import Kyle.backend.service.JwtService;
import Kyle.backend.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import Kyle.backend.dto.RegisterRequest;
import Kyle.backend.dto.TokenResponse;

@RestController
@CrossOrigin("http://localhost:4200")
public class RegisterationController {

  @Autowired
  private UserService userService;

  @Autowired
  private JwtService jwtService;

  @PostMapping("/api/register/")
  public ResponseEntity<?> registerUser(@RequestBody RegisterRequest request, HttpServletResponse response) {
    User user = userService.registerUser(request.getUsername(), request.getPassword(), request.getEmail());

    if(user == null) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Could not register user");
    }

    String refreshToken = jwtService.generateRefreshToken(user);
    String accessToken = jwtService.generateAccessToken(user);

    Cookie refreshTokenCookie = new Cookie("refreshToken", refreshToken);
    refreshTokenCookie.setHttpOnly(true);
    refreshTokenCookie.setPath("/api/refresh");
    response.addCookie(refreshTokenCookie);

    return ResponseEntity.ok(new TokenResponse(accessToken));
  }
}
