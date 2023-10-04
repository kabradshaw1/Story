package Kyle.backend.service;

import Kyle.backend.dao.UserRepository;
import Kyle.backend.entity.User;
import Kyle.backend.exception.EmailAlreadyExistsException;
import Kyle.backend.exception.InvalidEmailException;

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
        Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$", Pattern.CASE_INSENSITIVE);

    public User registerUser(String username, String password, String email) {
        Optional<User> existingUser = userRepository.findByEmail(email);

        if (existingUser.isPresent()) {
            throw new EmailAlreadyExistsException("Email already registered: " + email);
        }
        if (!isValidEmail(email)) {
            throw new InvalidEmailException("Invalid email format: " + email);
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
        return null;
    }
}
