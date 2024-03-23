// package Kyle.backend.dao;

// import Kyle.backend.entity.Conflict;

// import java.util.Optional;

// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.security.access.prepost.PreAuthorize;
// import org.springframework.web.bind.annotation.CrossOrigin;

// @CrossOrigin("http://localhost:4200")
// public interface ConflictRepository extends JpaRepository<Conflict, Long> {

//   @SuppressWarnings("null")
//   @Override
//   @PreAuthorize("hasRole('Admin') or #entity.username == authentication.principal.username")
//   <S extends Conflict> S save(S entity);

//   Optional<Conflict> findByTitle(String title);
// }