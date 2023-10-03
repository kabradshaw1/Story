package Kyle.backend.service;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
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
    when(passwordEncoder.matches(anyString(), anyString())).thenReturn(true);  // This sets up the mock to return true for any password match check. Adjust as needed.
  }

  @Test
  public void givenAcceptableCredentials_whenRegisterUser_thenCreateUser() {
    // Given
    String username = "testUser1";
    String password = "testPassword";
    String email = "test1@example.com";

    // Mocking behavior: assume the user with the given email and username does not exist
    when(userRepository.findByEmail(email)).thenReturn(null);
    when(userRepository.findByUsername(username)).thenReturn(null);

    // When
    userService.registerUser(username, password, email); // assuming your service has this method

    // Then
    // This assertion checks that the save method of the repository was called exactly once.
    verify(userRepository, times(1)).save(any(User.class));


  }

  @Test
  public void givenExistingEmail_whenRegisterUser_thenThrowException() {

  }
  @Test
  public void givenInvalidEmail_whenRegisterUser_thenThrowException() {

  }

  @Test
  public void givenShortPassword_whenRegisterUser_thenThrowException() {

  }

  @Test
  public void givenExistingUsername_whenRegisterUser_thenThrowException() {

  }

  @Test
  public void givenValidUserCredentials_whenValidateUserCredentials_thenReturnUser() {

  }
  @Test
  public void givenInvalidUserCredentials_whenValidateUserCredentials_thenThrowException() {

  }
}
