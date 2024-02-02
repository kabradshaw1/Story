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
@Table(name = "scene")
@Data
@NoArgsConstructor
public class Scene {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @Column(name = "title")
  private String title;

  @Column(name = "text")
  private String text;

  @Column(name = "date_created")
  @CreationTimestamp
    private Date dateCreated;

  @Column(name = "date_modified")
  @LastModifiedDate
    private Date dateModified;

  @ManyToMany
  @JoinTable(
    name = "character_scene",
    joinColumns = @JoinColumn(name = "scene_id"),
    inverseJoinColumns = @JoinColumn(name = "character_id")
  )
  private Set<Character> characters = new HashSet<>();
}
