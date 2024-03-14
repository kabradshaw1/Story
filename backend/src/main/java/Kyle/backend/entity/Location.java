package Kyle.backend.entity;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.LastModifiedDate;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "locations")
@Data
@NoArgsConstructor
public class Location {

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

  @ManyToOne
  @JoinColumn(name = "region")
  private Region region;

//   @ManyToOne
//   @JoinColumn(name = "timeline_start_id")
//   private Timeline timelineStart;

//   @ManyToOne
//   @JoinColumn(name = "timeline_end_id")
//   private Timeline timelineEnd;

//   @OneToMany(mappedBy = "starting_location", cascade = CascadeType.ALL)
//   private Set<Scene> startingScenes = new HashSet<>();

//   @OneToMany(mappedBy = "endinging_location", cascade = CascadeType.ALL)
//   private Set<Scene> endingScenes = new HashSet<>();

//   public void addStartingScene(Scene scene) {
//     if (scene != null) {
//       startingScenes.add(scene);
//       scene.setStartingLocation(this);
//     }
//   }

//   public void addEndingScene(Scene scene) {
//     if (scene != null) {
//       endingScenes.add(scene);
//       scene.setEndingLocation(this);
//     }
//   }

  @ManyToMany
  @JoinTable(
    name = "organization_location",
    joinColumns = @JoinColumn(name = "organization_id"),
    inverseJoinColumns = @JoinColumn(name = "location_id")
  )
  private Set<Location> locations = new HashSet<>();
}
