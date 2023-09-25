package Kyle.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import Kyle.backend.dto.RefreshTokenRequest;
import Kyle.backend.service.JwtService;

@RestController
@CrossOrigin("http://localhost:4200")
public class RefreshController {

  // @PostMapping("/api/refresh")
  // public ResponseEntity<String> refreshAccessToken(@RequestBody RefreshTokenRequest refreshTokenRequest) {
  //   try {
  //     String newAccessToken = JwtService.refreshAccessToken(refreshTokenRequest.getRefreshToken())
  //   }
  // }

}
