package Kyle.backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;

@Component
public class DbConnectionTest {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @PostConstruct
    public void init(){
        try {
            String sql = "SELECT NOW()";
            String currentTime = jdbcTemplate.queryForObject(sql, String.class);
            System.out.println("Successful Database Connection! Current time: " + currentTime);
        } catch (Exception e) {
            System.out.println("Failed to connect to the database: " + e.getMessage());
        }
    }
}

