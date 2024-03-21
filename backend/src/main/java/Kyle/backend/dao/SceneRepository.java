package Kyle.backend.dao;

import Kyle.backend.entity.Scene;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
public interface SceneRepository extends JpaRepository<Scene, Long> {

  @SuppressWarnings("null")
  @Override
  @PreAuthorize("hasRole('Admin') or #entity.username == authentication.principal.username")
  <S extends Scene> S save(S entity);

  Optional<Scene> title(String title);
}