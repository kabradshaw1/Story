package Kyle.backend.service;

import Kyle.backend.dao.UserRepository;
import Kyle.backend.entity.User;
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
        password = passwordEncoder.encode(password);
        User newUser = new User(username, password, email);
        return userRepository.save(newUser);
    }

    public User validateUserCredentials(String username, String password) {
        return null;
    }
}
