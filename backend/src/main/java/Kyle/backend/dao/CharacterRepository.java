package Kyle.backend.dao;

import Kyle.backend.entity.Character;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource
public interface CharacterRepository extends JpaRepository<Character, Long> {

  @SuppressWarnings("null")
  @Override
  @PreAuthorize("hasRole('Admin') or #entity.createdBy == authentication.hame")
  <S extends Character> S save(S entity);
  
  Optional<Character> name(String name);
}
