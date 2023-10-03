package Kyle.backend.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import Kyle.backend.dao.UserRepository;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

  @Mock
  private UserRepository userRepository;

  @InjectMocks
  private UserService userService;

  @Test
  public void giveAcceptableCredentials_whenRegisterUser_thenCreateUser() {

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
