package Kyle.backend.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import Kyle.backend.dao.UserRepository;
import Kyle.backend.entity.User;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

  @Mock
  private UserRepository userRepository;

  @Mock
  private BCryptPasswordEncoder passwordEncoder;

  @InjectMocks
  private UserService userService;

  private User user;

  @BeforeEach
  private void setup() {
    user = new User("testUser", "testPassword", "test@example.com");
    when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");
    when(userRepository.save(any(User.class))).thenReturn(user);
  }

  @Test
  public void givenAcceptableCredentials_whenRegisterUser_thenCreateUser() {
    // Given
    String username = "testUser1";
    String password = "testPassword";
    String email = "test1@example.com";

    // When
    User createdUser = userService.registerUser(username, password, email);

    // Then
    verify(passwordEncoder).encode(password);  // Verify that the encode method was called with the provided password
    assertNotNull(createdUser);
    ArgumentCaptor<User> userArgumentCaptor = ArgumentCaptor.forClass(User.class);
    verify(userRepository).save(userArgumentCaptor.capture());
    User savedUser = userArgumentCaptor.getValue();
    assertEquals(email, savedUser.getEmail());
    assertEquals(username, savedUser.getUsername());
  }

  @Test
  public void givenExistingEmail_whenRegisterUser_thenThrowException() {

  }
  
  // @Test
  // public void givenInvalidEmail_whenRegisterUser_thenThrowException() {

  // }

  // @Test
  // public void givenShortPassword_whenRegisterUser_thenThrowException() {

  // }

  // @Test
  // public void givenExistingUsername_whenRegisterUser_thenThrowException() {

  // }

  // @Test
  // public void givenValidUserCredentials_whenValidateUserCredentials_thenReturnUser() {

  // }

  // @Test
  // public void givenInvalidUserCredentials_whenValidateUserCredentials_thenThrowException() {

  // }
}
