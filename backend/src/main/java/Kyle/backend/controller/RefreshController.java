package Kyle.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
import Kyle.backend.service.JwtService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin( origins = "http://localhost:4200", allowCredentials = "true")
public class RefreshController {

    @Autowired
    private JwtService jwtService; // Inject JwtService

    @PostMapping("/api/refresh/")
    public ResponseEntity<?> refreshAccessToken(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                String[] nameValuePair = cookie.trim().split("=");
                if (nameValuePair.length >= 2 && "refreshToken".equals(nameValuePair[0])) {
                    String refreshToken = nameValuePair[1];
                    try {
                        String newAccessToken = jwtService.refreshAccessToken(refreshToken);
                        return ResponseEntity.ok(newAccessToken);
                    } catch (Exception e) {
                        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid refresh token");
                    }
                }
            }
        }
    }
}
