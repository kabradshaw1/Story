package Kyle.backend.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

import Kyle.backend.entity.Timeline;

@CrossOrigin("https://localhost:4200")
public interface TimelineRepository extends JpaRepository<Timeline, Long> {

  Optional<Timeline> timeline(Integer timeline);

}
