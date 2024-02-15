package Kyle.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.LastModifiedDate;

import java.util.Date;
import java.util.HashSet;

@Entity
@Table(name = "characters")
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

  @Column(name = "user_id")
  private Long user_id;
  
  @Column(name = "date_created")
  @CreationTimestamp
    private Date dateCreated;

  @Column(name = "date_modified")
  @LastModifiedDate
    private Date dateModified;

  @ManyToMany
  @JoinTable(
    name = "charact_scene",
    joinColumns = @JoinColumn(name = "character_id"),
    inverseJoinColumns = @JoinColumn(name = "scene_id")
  )
  private Set<Scene> scenes = new HashSet<>();

  public Character(String name, String bio) {
    this.name = name;
    this.bio = bio;
  }
}
