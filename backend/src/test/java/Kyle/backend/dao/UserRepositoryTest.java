package Kyle.backend.dao;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.TestPropertySource;

import Kyle.backend.entity.User;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@TestPropertySource(locations = "classpath:test.properties")
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TestEntityManager entityManager;

    private User user;

    @BeforeEach
    void setup() {
        user = new User("testUser", "testPassword", "test@email.com");
        entityManager.persistAndFlush(user);
    }

    @Test
    void givenEmail_whenFindByEmail_thenReturnsUser() {
        Optional<User> retrievedUser = userRepository.findByEmail("test@email.com");
        assertTrue(retrievedUser.isPresent(), "User should be present");
        assertEquals("test@email.com", retrievedUser.get().getEmail(), "Emails should match");
    }

    @Test
    void givenId_whenFindById_thenReturnsUser() {
        Optional<User> retrievedUser = userRepository.findById(user.getId()); // Use the Id assigned by the database
        assertTrue(retrievedUser.isPresent(), "User should be present");
        assertEquals(user.getId(), retrievedUser.get().getId(), "IDs should match");
    }

    @Test
    void givenInvalidEmail_whenFindByEmail_thenReturnsEmptyOptional() {
        Optional<User> retrievedUser = userRepository.findByEmail("nonexistent@email.com");
        assertFalse(retrievedUser.isPresent(), "User should not be present");
    }

    @Test
    void givenInvalidId_whenFindById_thenReturnsEmptyOptional() {
        Optional<User> retrievedUser = userRepository.findById(-1L); // or any non-existent ID
        assertFalse(retrievedUser.isPresent(), "User should not be present");
    }

    @Test
    void giveUsername_whenFindByUsername_thenReturnUser() {
        Optional<User> retrievedUser = userRepository.findByUsername(user.getUsername()); // Use the Id assigned by the database
        assertTrue(retrievedUser.isPresent(), "User should be present");
        assertEquals(user.getUsername(), retrievedUser.get().getUsername(), "IDs should match");
    }

    @Test
    void givenInvalidUsername_whenFindByUsername_thenReturnEmptyOptional() {
        Optional<User> retrievedUser = userRepository.findByUsername("noUser"); // or any non-existent ID
        assertFalse(retrievedUser.isPresent(), "User should not be present");
    }
}
