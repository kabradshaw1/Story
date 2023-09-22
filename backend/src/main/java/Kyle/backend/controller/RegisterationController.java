package Kyle.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import Kyle.backend.entity.User;
import Kyle.backend.service.JwtService;
import Kyle.backend.service.UserService;
import Kyle.backend.dto.RegisterRequest;

@RestController
@CrossOrigin("http://localhost:4200")
public class RegisterationController {

  @Autowired
  private UserService userService;

  @Autowired
  private JwtService jwtService;

  @PostMapping("/api/register/")
  public ResponseEntity<String> registerUser(@RequestBody RegisterRequest request) {
    User user = userService.registerUser(request.getUsername(), request.getPassword(), request.getEmail());
    String jwt = jwtService.generateToken(user);
    return ResponseEntity.ok(jwt);
  }
}
