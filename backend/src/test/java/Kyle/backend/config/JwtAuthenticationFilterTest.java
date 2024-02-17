package Kyle.backend.config;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockFilterChain;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.security.core.context.SecurityContextHolder;

import Kyle.backend.service.JwtService;

import static org.mockito.Mockito.*;
import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(MockitoExtension.class)
public class JwtAuthenticationFilterTest {

    @Mock
    private JwtService jwtService;

    @InjectMocks
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    private MockHttpServletRequest request;
    private MockHttpServletResponse response;
    private MockFilterChain filterChain;

    @BeforeEach
    void setUp() {
        request = new MockHttpServletRequest();
        response = new MockHttpServletResponse();
        filterChain = new MockFilterChain();

        // Assume jwtService.validateToken returns true for "valid.token"
        when(jwtService.validateToken(anyString())).thenReturn(true);
    }

    @Test
    void whenValidJwtProvided_thenSecurityContextShouldBeUpdated() throws Exception {
        // Simulate a request with a valid JWT
        request.addHeader("Authorization", "Bearer valid.token");

        jwtAuthenticationFilter.doFilterInternal(request, response, filterChain);

        // Verify that the security context has been updated
        assertThat(SecurityContextHolder.getContext().getAuthentication()).isNotNull();
        assertThat(SecurityContextHolder.getContext().getAuthentication().isAuthenticated()).isTrue();

        // Reset the SecurityContext for next tests
        SecurityContextHolder.clearContext();
    }

    @Test
    void whenInvalidJwtProvided_thenSecurityContextShouldNotBeUpdated() throws Exception {
        // Assume jwtService.validateToken returns false for "invalid.token"
        when(jwtService.validateToken("invalid.token")).thenReturn(false);

        // Simulate a request with an invalid JWT
        request.addHeader("Authorization", "Bearer invalid.token");

        jwtAuthenticationFilter.doFilterInternal(request, response, filterChain);

        // Verify that the security context has not been updated
        assertThat(SecurityContextHolder.getContext().getAuthentication()).isNull();
    }

    @Test
    void whenNoJwtProvided_thenSecurityContextShouldNotBeUpdated() throws Exception {
        jwtAuthenticationFilter.doFilterInternal(request, response, filterChain);

        // Verify that the security context has not been updated
        assertThat(SecurityContextHolder.getContext().getAuthentication()).isNull();
    }
}
