package Kyle.backend.entity;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.LastModifiedDate;

@Entity
@Table(name = "scenes")
@Data
@NoArgsConstructor
public class Scene implements Ownable {

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

  @ManyToMany
  @JoinTable(
    name = "character_scene",
    joinColumns = @JoinColumn(name = "scene_id"),
    inverseJoinColumns = @JoinColumn(name = "character_id")
  )
  private Set<Character> characters = new HashSet<>();

  @ManyToOne
  @JoinColumn(name = "timeline_start_id")
  private Timeline timelineStart;

  @ManyToOne
  @JoinColumn(name = "timeline_end_id")
  private Timeline timelineEnd;


}

// @ManyToMany(fetch = FetchType.LAZY, cascade = { CascadeType.PERSIST, CascadeType.MERGE, CascadeType.DETACH, CascadeType.REFRESH })
// @JoinTable(
//   name = "organization_scene",
//   joinColumns = @JoinColumn(name = "scene_id"),
//   inverseJoinColumns = @JoinColumn(name = "organization_id")
// )
// private Set<Organization> organizations;
  // @ManyToOne
  // @JoinColumn(name = "starting_location_id")
  // private Location startingLocation;

  // @ManyToOne
  // @JoinColumn(name = "ending_location_id")
  // private Location endingLocation;

  // @ManyToOne
  // @JoinColumn(name = "organization_start_id")
  // private Organization organizationStart;

  // @ManyToOne
  // @JoinColumn(name = "organization_end_id")
  // private Organization organizationEnd;

  // @ManyToOne
  // @JoinColumn(name = "character_death_id")
  // private Character characterDeath;

  // @OneToOne
  // @JoinColumn(name = "location_creation_id")
  // private Location locationCreation;

  // @ManyToOne
  // @JoinColumn(name = "location_end_id")
  // private Location locationEnd;