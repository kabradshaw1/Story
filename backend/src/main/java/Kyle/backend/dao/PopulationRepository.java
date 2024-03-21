package Kyle.backend.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

import Kyle.backend.entity.Population;

@CrossOrigin("https://localhost:4200")
public interface PopulationRepository extends JpaRepository<Population, Long> {

  Optional<Population> population(Integer population);

}
