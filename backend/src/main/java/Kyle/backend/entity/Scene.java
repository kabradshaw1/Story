package Kyle.backend.entity;

import jakarta.persistence.*;
import lombok.Data;


import java.util.Set;
import java.util.HashSet;

@Entity
@Table(name = "scene")
@Data
public class Scene {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @Column(name = "title")
  private String title;

  @Column(name = "text")
  private String text;

  @ManyToMany
  @JoinTable(
    name = "character_scene",
    joinColumns = @JoinColumn(name = "scene_id"),
    inverseJoinColumns = @JoinColumn(name = "character_id")
  )
  private Set<Character> characters = new HashSet<>();
}
