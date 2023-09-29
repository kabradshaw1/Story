package Kyle.backend.service;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import Kyle.backend.dao.UserRepository;
import Kyle.backend.entity.User;

@ExtendWith(MockitoExtension.class)
public class JwtServiceTest {

  @Mock
  private UserRepository userRepository;

  @InjectMocks
  private JwtService jwtService;

  @Test
  public void givenUser_whenGenerateAccessTken_thenReturnToken() {
    // Given
    User user = new User();
    user.setUsername("testUser");
    user.setEmail("test@email.com");
  }
}
