package Kyle.backend.dao;

import Kyle.backend.entity.Character;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
public interface CharacterRepository extends JpaRepository<Character, Long> {
  Optional<Character> name(String name);
}
