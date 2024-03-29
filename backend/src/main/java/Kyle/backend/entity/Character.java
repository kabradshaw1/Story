package Kyle.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.LastModifiedDate;

import java.util.Date;
import java.util.HashSet;

@Entity
@Table(name = "characters")
@Data
@NoArgsConstructor
public class Character implements Ownable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @Column(name = "title")
  private String title;

  @Column(name = "body")
  private String body;

  @Column(name = "username")
  @CreatedBy
  private String username;

  @Column(name = "date_created")
  @CreationTimestamp
  private Date dateCreated;

  @Column(name = "date_modified")
  @LastModifiedDate
  private Date dateModified;

  @ManyToMany(mappedBy = "characters")
  private Set<Conflict> conflicts = new HashSet<>();

  @ManyToMany
  @JoinTable(
    name = "character_organization",
    joinColumns = @JoinColumn(name = "character_id"),
    inverseJoinColumns = @JoinColumn(name = "organization_id")
  )
  private Set<Organization> organizations = new HashSet<>();


  @ManyToMany(cascade = CascadeType.ALL)
  @JoinTable(
    name = "character_scene",
    joinColumns = @JoinColumn(name = "character_id"),
    inverseJoinColumns = @JoinColumn(name = "scene_id")
  )
  private Set<Scene> scenes = new HashSet<>();
}

  // @ManyToOne
  // @JoinColumn(name = "scene_birth_id")
  // private Scene birthScene;

  // @ManyToOne
  // @JoinColumn(name = "scene_death_id")
  // private Scene deathScene;

  // @ManyToOne
  // @JoinColumn(name = "timeline_birth_id")
  // private Timeline birthTimeline;

  // @ManyToOne
  // @JoinColumn(name = "timeline_death_id")
  // private Timeline deathTimeline;