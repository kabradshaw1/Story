package Kyle.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import Kyle.backend.dao.UserRepository;
import Kyle.backend.dto.RefreshTokenRequest;
import Kyle.backend.service.JwtService;

@RestController
@CrossOrigin("http://localhost:4200")
public class RefreshController {

    @Autowired
    private JwtService jwtService; // Inject JwtService

    @PostMapping("/api/refresh")
    public ResponseEntity<String> generateRefreshToken(@RequestBody RefreshTokenRequest refreshTokenRequest) {
        try {
            String newAccessToken = jwtService.generateRefreshToken(refreshTokenRequest.getRefreshToken());
            return ResponseEntity.ok(newAccessToken); // Return the new access token
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid refresh token");
        }
    }
}
