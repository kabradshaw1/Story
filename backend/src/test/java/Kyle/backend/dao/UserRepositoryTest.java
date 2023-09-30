package Kyle.backend.dao; // Corrected the package name from 'doa' to 'dao'

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;

import Kyle.backend.entity.User;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TestEntityManager entityManager;

    private User user;

    @BeforeEach
    private void setup() {
        user = new User("testUser", "testPassword", "test@email.com");
        entityManager.persistAndFlush(user);
    }

    @Test
    public void shouldFindByEmail() {
        Optional<User> retrievedUser = userRepository.findByEmail("test@email.com");
        assertTrue(retrievedUser.isPresent(), "User should be present");
        assertEquals("test@email.com", retrievedUser.get().getEmail(), "Emails should match");
    }

    @Test
    void shouldFindById() {
        Optional<User> retrievedUser = userRepository.findById(user.getId()); // Use the Id assigned by the database
        assertTrue(retrievedUser.isPresent(), "User should be present");
        assertEquals(user.getId(), retrievedUser.get().getId(), "IDs should match");
    }

    @Test
    public void shouldNotFindByEmail() {
        Optional<User> retrievedUser = userRepository.findByEmail("nonexistent@email.com");
        assertFalse(retrievedUser.isPresent(), "User should not be present");
    }

    @Test
    public void shouldNotFindById() {
        Optional<User> retrievedUser = userRepository.findById(-1L); // or any non-existent ID
        assertFalse(retrievedUser.isPresent(), "User should not be present");
    }
}
