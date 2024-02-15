package Kyle.backend.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.mockito.Mockito.when;

import java.util.Optional;

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
import Kyle.backend.exception.user.EmailAlreadyExistsException;
import Kyle.backend.exception.user.InvalidEmailException;
import Kyle.backend.exception.user.InvalidLoginException;
import Kyle.backend.exception.user.PasswordTooShortException;
import Kyle.backend.exception.user.UsernameAlreadyExistsException;

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
  }

  @SuppressWarnings("null")
  @Test
  public void givenAcceptableCredentials_whenRegisterUser_thenCreateUser() {
      // Given
      String username = "testUser1";
      String password = "testPassword";
      String email = "test1@example.com";

      // When
      when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");
      when(userRepository.save(any(User.class))).thenReturn(user);
      User createdUser = userService.registerUser(username, password, email);

      // Then
      verify(passwordEncoder).encode(password);  // Verify that the encode method was called with the provided password
      assertNotNull(createdUser);
      ArgumentCaptor<User> userArgumentCaptor = ArgumentCaptor.forClass(User.class);
      verify(userRepository).save(userArgumentCaptor.capture());
      User savedUser = userArgumentCaptor.getValue();
      assertEquals(email, savedUser.getEmail());
      assertEquals(username, savedUser.getUsername());

      // Verify that the saved password isn't null and isn't the plaintext password
      assertNotNull(savedUser.getPassword(), "The saved password should not be null");
      assertNotEquals(password, savedUser.getPassword(), "The saved password should not be in plaintext");
  }

  @Test
  public void givenExistingEmail_whenRegisterUser_thenThrowException() {
      // Given
      String username = "testUser";
      String password = "testPassword";
      String email = "test1@example.com";

      // Setup the mock to make findByEmail return an Optional with a user (indicating the email exists)
      when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));

      // Then
      EmailAlreadyExistsException exception = assertThrows(EmailAlreadyExistsException.class,
          () -> userService.registerUser(username, password, email),
          "This email has already been used.");

      assertEquals("Email already registered: " + email, exception.getMessage());
  }

  @Test
  public void givenExistingUsername_whenRegisterUser_thenThrowException() {
    // Given
    String username = "testUser1";
    String password = "testPassword";
    String email = "test@example.com";

    // Setup the mock to make findByUsername return an Optional with a user (indciating the username exists)
    when(userRepository.findByUsername(username)).thenReturn(Optional.of(user));

    // Then
    UsernameAlreadyExistsException exception = assertThrows(UsernameAlreadyExistsException.class,
      () -> userService.registerUser(username, password, email),
      "This username has already been used.");

    assertEquals("Username already registered: " + username, exception.getMessage());
  }


  @Test
  public void givenInvalidEmail_whenRegisterUser_thenThrowException() {
    // Given
    String username = "testUser1";
    String password = "testPassword";

    // Examples of invalid emails
    String[] invalidEmails = {
      "plainaddress",
      "@missingusername.org",
      "username@.com",
      "username@domain.com.",
      "username@.domain.com",
      ".username@domain.com"
      // Add other invalid formats as required
    };

    for (String email : invalidEmails) {
      // Then
      InvalidEmailException exception = assertThrows(InvalidEmailException.class,
        () -> userService.registerUser(username, password, email),
        "Expected to throw an exception for invalid email format.");

      assertEquals("Invalid email format: " + email, exception.getMessage());
    }
  }

  @SuppressWarnings("null")
  @Test
  public void givenShortPassword_whenRegisterUser_thenThrowException() {
    // Given
    String password = "test123";
    String username = "testUser1";
    String email = "test1@example.com";

    // Then
    PasswordTooShortException exception = assertThrows(PasswordTooShortException.class,
    () -> userService.registerUser(username, password, email),
    "Expected to throw an exception for a short password.");

    assertEquals("Password is too short.", exception.getMessage());

    // To ensure that the entry wasn't created
    verify(userRepository, never()).save(any(User.class));
  }

  @Test
  public void givenValidUserCredentials_whenValidateUserCredentials_thenReturnUser() {
    // Given
    String password = "testPassword";
    String email = "test@example.com";
    User expectedUser = new User("testUser", passwordEncoder.encode(password), email);

    // Mock the behavior of the password encoder
    when(passwordEncoder.matches(eq("testPassword"), any())).thenReturn(true);

    // Setup the mock to make findByEmail return an Optional with the expectedUser
    when(userRepository.findByEmail(email)).thenReturn(Optional.of(expectedUser));

    // When
    User returnedUser = userService.validateUserCredentials(email, password);

    // Then
    assertNotNull(returnedUser);
    assertEquals(returnedUser.getEmail(), email);
    assertEquals(returnedUser.getUsername(), expectedUser.getUsername());
    verify(userRepository, times(1)).findByEmail(email);
    verifyNoMoreInteractions(userRepository);  // Ensure that no other methods like save() were called on the userRepository
  }

  @Test
  public void givenInvalidEmail_whenValidateUserCredentials_thenThrowException() {
    // Given
    String email = "invalid@example.com";
    String password = "testPassword";

    // Set the mock to return an empty Optional, as if the email doesn't exist in the repository.
    when(userRepository.findByEmail(email)).thenReturn(Optional.empty());

    // Then
    InvalidLoginException exception = assertThrows(InvalidLoginException.class,
        () -> userService.validateUserCredentials(email, password),
        "Expected an InvalidLoginException due to invalid email.");

    assertEquals("Invalid login credentials.", exception.getMessage());
    verify(userRepository, times(1)).findByEmail(email);
    verifyNoMoreInteractions(userRepository);
  }

  @Test
  public void givenInvalidPassword_whenValidateUserCredentials_thenThrowException() {
    // Given
    String email = "test@example.com";
    String invalidPassword = "wrongPassword";
    User userWithValidCredentials = new User("testUser", passwordEncoder.encode("testPassword"), email);

    // Setup the mock to emulate the behavior that the password doesn't match.
    when(passwordEncoder.matches(eq(invalidPassword), any())).thenReturn(false);
    when(userRepository.findByEmail(email)).thenReturn(Optional.of(userWithValidCredentials));

    // Then
    InvalidLoginException exception = assertThrows(InvalidLoginException.class,
        () -> userService.validateUserCredentials(email, invalidPassword),
        "Expected an InvalidLoginException due to invalid password.");

    assertEquals("Invalid login credentials.", exception.getMessage());
    verify(userRepository, times(1)).findByEmail(email);
    verifyNoMoreInteractions(userRepository);
  }
}
