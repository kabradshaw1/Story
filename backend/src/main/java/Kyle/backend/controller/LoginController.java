package Kyle.backend.controller;

import Kyle.backend.dto.LoginRequest;
import Kyle.backend.entity.User;
import Kyle.backend.service.JwtService;
import Kyle.backend.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

public class LoginController {

  @Autowired
  private UserService userService;

  @Autowired
  private JwtService jwtService;

  @PostMapping("/login")
  public ResponseEntity<String> loginUser(@RequestBody LoginRequest loginRequest) {
    User user = userService.validateUserCredentials(loginRequest.getUsername(), loginRequest.getPassword());

    if(user == null) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }

    String jwt = jwtService.generateToken(user);
    return ResponseEntity.ok(jwt);
  }
}
