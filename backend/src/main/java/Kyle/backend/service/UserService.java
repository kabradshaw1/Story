package Kyle.backend.service;

import Kyle.backend.dao.UserRepository;
import Kyle.backend.entity.User;
import Kyle.backend.exception.user.EmailAlreadyExistsException;
import Kyle.backend.exception.user.InvalidEmailException;
import Kyle.backend.exception.user.InvalidLoginException;
import Kyle.backend.exception.user.PasswordTooShortException;
import Kyle.backend.exception.user.UsernameAlreadyExistsException;

import java.util.Optional;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    private static final Pattern VALID_EMAIL_ADDRESS_REGEX =
        Pattern.compile("^(?!\\.)[A-Za-z0-9._%+-]+@(?![.])[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}$", Pattern.CASE_INSENSITIVE);

    public User registerUser(String username, String password, String email) {
        Optional<User> existingEmail = userRepository.findByEmail(email);
        Optional<User> existingUsername = userRepository.findByUsername(username);

        if (existingEmail.isPresent()) {
            throw new EmailAlreadyExistsException("Email already registered: " + email);
        }
        if (existingUsername.isPresent()) {
            throw new UsernameAlreadyExistsException("Username already registered: " + username);
        }
        if (!isValidEmail(email)) {
            throw new InvalidEmailException("Invalid email format: " + email);
        }
        if (password.length() < 8) {
        throw new PasswordTooShortException("Password is too short.");
        }
        password = passwordEncoder.encode(password);
        User newUser = new User(username, password, email);
        return userRepository.save(newUser);
    }

    private boolean isValidEmail(String emailStr) {
        return VALID_EMAIL_ADDRESS_REGEX.matcher(emailStr).matches();
    }

    public User validateUserCredentials(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);

        if(user.isPresent() && passwordEncoder.matches(password, user.get().getPassword())) {
            return user.get();
        }
        throw new InvalidLoginException();
    }
}
