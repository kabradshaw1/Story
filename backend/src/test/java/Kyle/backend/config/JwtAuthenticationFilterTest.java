package Kyle.backend.config;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


public class JwtAuthenticationFilterTest {

    private MockMvc mockMvc;

    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @BeforeEach
    public void setup() {
        jwtAuthenticationFilter = new JwtAuthenticationFilter();
        mockMvc = MockMvcBuilders
                    .standaloneSetup(new TestController()) // Use a minimal controller for testing
                    .addFilters(jwtAuthenticationFilter) // Add your JwtAuthenticationFilter
                    .build();
    }

    @Test
    public void giveNoToken_whenAccessingRestrictedEndpoint_thenAccessDenied() throws Exception {
        mockMvc.perform(get("/test/protected"))
                .andExpect(status().isForbidden()); // or isUnauthorized(), depending on your filter's behavior
    }

    @Test
    public void givenInvlidToken_whenAccessingRestrictedEndPoint_thenAccessDenied() throws Exception {

    }

    @Test
    public void givenValidToken_whenAccessingRestrictedEndPoint_thenAccessApproved() {

    }

    @Test
    public void givenNoToken_whenAcessingUnrestrictedEndPoint_thenAccessAppoved() {

    }

    @RestController
    public static class TestController {
        @GetMapping("/test/protected")
        public ResponseEntity<String> protectedEndpoint() {
            return ResponseEntity.ok("Access Granted");
        }
    }
}
