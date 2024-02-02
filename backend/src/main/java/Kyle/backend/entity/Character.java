package Kyle.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;
import java.util.HashSet;

@Entity
@Table(name = "chartacter")
@Data
@NoArgsConstructor
public class Character {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @Column(name = "name")
  private String name;

  @Column(name = "bio")
  private String bio;

  @ManyToMany
  @JoinTable(
    name = "charact_scene",
    joinColumns = @JoinColumn(name = "character_id"),
    inverseJoinColumns = @JoinColumn(name = "scene_id")
  )
  private Set<Scene> scenes = new HashSet<>();

}
