package Kyle.backend.endpoint;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Collections;
import java.util.stream.Stream;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;

import Kyle.backend.config.CustomUserPrincipal;
import Kyle.backend.service.JwtService;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@AutoConfigureMockMvc
@TestPropertySource(locations = "classpath:application-test.properties")
public class EndpointIntegrationTest {

  @Autowired
  private MockMvc mockMvc;

  @MockBean
  private JwtService jwtService;

  static Stream<String> endpointProvider() {
    return Stream.of("/api/characters", "/api/scenes"); // Add more endpoints as needed
  }

  @BeforeEach
  public void setup() {
    // Mocks making it past the token validation in JwtAuthFilter
    when(jwtService.validateToken("valid.token")).thenReturn(true);
    // Mock authenticating a user and so that JwtAuthFilter will set a valid user
    // when it calls jwtService.getAuthentiation()
    CustomUserPrincipal principal = new CustomUserPrincipal(
      "username",
      1L,
      Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"))
    );
    Authentication authentication = new UsernamePasswordAuthenticationToken(
      principal,
      null,
      Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"))
    );
    when(jwtService.getAuthentication("valid.token")).thenReturn(authentication);
  }

  @SuppressWarnings("null")
  @ParameterizedTest
  @MethodSource("endpointProvider")
  public void givenAuthUser_whenCharacterPost_thenCreatePost(String endpoint) throws Exception {

    String body = """
      {
        "title": "string",
        "body": "string"
      }
      """;

    mockMvc.perform(post(endpoint)
      .header("Authorization", "Bearer valid.token")
      .content(body))
      .andExpect(status().isCreated());
  }

  @Nested
  class DeleteAndPatchTests {

    static Stream<String> endpointProvider() {
      return Stream.of("/api/characters", "/api/scenes"); // Add more endpoints as needed
    }

    @BeforeEach
    public void setUpForDelete() throws Exception {
         // Create a character in the mocked database.  This is all I need to locate a character
      // and verify that it was made by the person that is authenticated

      String body = """
        {
          "title": "string",
          "body": "string"
        }
        """;

      mockMvc.perform(post("/api/characters")
        .header("Authorization", "Bearer valid.token")
        .content(body))
        .andExpect(status().isCreated());
    }

    @Transactional
    @ParameterizedTest
    @MethodSource("endpointProvider")
    public void givenWrongAuthUser_whenDeletingPost_thenReturnError(String endpoint) throws Exception {

      CustomUserPrincipal principal = new CustomUserPrincipal(
        "WrongUsername",
        1L,
        Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"))
      );
      Authentication authentication = new UsernamePasswordAuthenticationToken(
        principal,
        null,
        Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"))
      );
      when(jwtService.getAuthentication("valid.token")).thenReturn(authentication);

      // Test that delete doesn't work
      mockMvc.perform(delete("/api/characters/1")
        .header("Authorization", "Bearer valid.token"))
        .andExpect(status().isForbidden());
    }

    @Transactional
    @ParameterizedTest
    @MethodSource("endpointProvider")
    public void givenAdminUser_whenDeletingCharacter_thenDeleteCharacter(String endpoint) throws Exception{
      // This test is checking that the SimpleGrantedAuthority("ADMIN_USER") allows
      // the deleting of posts due to @PreAuthorize("hasRole('Admin') or #entity.username == authentication.principal.username")
      // in the characterRepository
      CustomUserPrincipal principal = new CustomUserPrincipal(
        "AdminUser",
        1L,
        Collections.singletonList(new SimpleGrantedAuthority("ADMIN_USER"))
      );
      Authentication authentication = new UsernamePasswordAuthenticationToken(
        principal,
        null,
        Collections.singletonList(new SimpleGrantedAuthority("ADMIN_USER"))
      );
      when(jwtService.getAuthentication("valid.token")).thenReturn(authentication);

      mockMvc.perform(delete(endpoint + "1")
        .header("Authorization", "Bearer valid.token"))
        .andExpect(status().isForbidden());
    }

    @Transactional
    @ParameterizedTest
    @MethodSource("endpointProvider")
    public void givenCorrectAuthUser_whenDeletingCharacter_thenDeleteCharacter(String endpoint) throws Exception {
      CustomUserPrincipal principal = new CustomUserPrincipal(
        "username",
        1L,
        Collections.singletonList(new SimpleGrantedAuthority("ADMIN_USER"))
      );
      Authentication authentication = new UsernamePasswordAuthenticationToken(
        principal,
        null,
        Collections.singletonList(new SimpleGrantedAuthority("ADMIN_USER"))
      );
      when(jwtService.getAuthentication("valid.token")).thenReturn(authentication);

      mockMvc.perform(delete(endpoint + "1")
        .header("Authorization", "Bearer valid.token"))
        .andExpect(status().isNoContent());
    }

    @Transactional
    @ParameterizedTest
    @MethodSource("endpointProvider")
    public void givenCorrectAuthUser_whenPatchCharacter_thenPatchCharacter(String endpoint) throws Exception {
      String updatedBody = """
        {
          "title": "updatedName",
          "body": "updatedBio"
        }
        """;

      mockMvc.perform(patch(endpoint + "1")
          .header("Authorization", "Bearer valid.token")
          .content(updatedBody))
          .andExpect(status().isNoContent());
    }
  }
}