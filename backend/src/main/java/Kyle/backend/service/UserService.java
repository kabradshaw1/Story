package Kyle.backend.service;

import Kyle.backend.dao.UserRepository;
import Kyle.backend.entity.User;
import Kyle.backend.exception.EmailAlreadyExistsException;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public User registerUser(String username, String password, String email) {
        Optional<User> existingUser = userRepository.findByEmail(email);

        if (existingUser.isPresent()) {
            throw new EmailAlreadyExistsException("Email already registered: " + email);
        }
        
        password = passwordEncoder.encode(password);
        User newUser = new User(username, password, email);
        return userRepository.save(newUser);
    }

    public User validateUserCredentials(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);

        if(user.isPresent() && passwordEncoder.matches(password, user.get().getPassword())) {
            return user.get();
        }
        return null;
    }
}
