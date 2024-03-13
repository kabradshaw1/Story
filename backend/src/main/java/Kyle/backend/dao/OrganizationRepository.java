package Kyle.backend.dao;

import Kyle.backend.entity.Organization;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource
public interface OrganizationRepository extends JpaRepository<Organization, Long> {

  @SuppressWarnings("null")
  @Override
  @PreAuthorize("hasRole('Admin') or #entity.username == authentication.principal.username")
  <S extends Organization> S save(S entity);

  Optional<Organization> title(String title);
}