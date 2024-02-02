package Kyle.backend.entity;
import org.hibernate.mapping.Set;

import jakarta.persistence.*;

@Entity
@Table(name = "scene")
public class Scene {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;


  // @ManyToMany(mappedBy = "scenes")
  // private Set<Character> characters;
}
