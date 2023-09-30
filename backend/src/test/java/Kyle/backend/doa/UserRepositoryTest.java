package Kyle.backend.doa;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import Kyle.backend.dao.UserRepository;
import Kyle.backend.entity.User;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class UserRepositoryTest {
  @Autowired
  private UserRepository userRepository;

  @Test
  void shouldFindByEmail() {
      User user = new User("testUser", "testPassword", "test@email.com");
      userRepository.save(user);

      Optional<User> retrievedUser = userRepository.findByEmail("test@email.com");

      assertThat(retrievedUser).isPresent();
      assertThat(retrievedUser.get().getEmail()).isEqualTo("test@email.com");
  }
}
