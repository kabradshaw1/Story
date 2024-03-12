// package Kyle.backend.entity;

// import java.util.Date;
// import java.util.HashSet;
// import java.util.Set;

// import org.hibernate.annotations.CreationTimestamp;
// import org.springframework.data.annotation.CreatedBy;
// import org.springframework.data.annotation.LastModifiedDate;

// import jakarta.persistence.*;
// import lombok.Data;
// import lombok.NoArgsConstructor;

// @Entity
// @Table(name = "organizations")
// @Data
// @NoArgsConstructor
// public class Organization {

//   @Id
//   @GeneratedValue(strategy = GenerationType.IDENTITY)
//   @Column(name = "id")
//   private Long id;

//   @Column(name = "name")
//   private String name;

//   @Column(name = "description")
//   private String description;

//   @Column(name = "username")
//   @CreatedBy
//   private String username;

//   @Column(name = "date_created")
//   @CreationTimestamp
//   private Date dateCreated;

//   @Column(name = "date_modified")
//   @LastModifiedDate
//   private Date dateModified;

//   @ManyToMany
//   @JoinTable(
//     name = "character_organization",
//     joinColumns = @JoinColumn(name = "organization_id"),
//     inverseJoinColumns = @JoinColumn(name = "character_id")
//   )

//   private Set<Character> characters = new HashSet<>();

//   @ManyToMany
//   @JoinTable(
//     name = "organization_location",
//     joinColumns = @JoinColumn(name = "organization_id"),
//     inverseJoinColumns = @JoinColumn(name = "location_id")
//   )

//   private Set<Location> locations = new HashSet<>();

//   @ManyToMany
//   @JoinTable(
//     name = "scene_organization",
//     joinColumns = @JoinColumn(name = "organization_id"),
//     inverseJoinColumns = @JoinColumn(name = "scene_id")
//   )
//   private Set<Scene> scenes = new HashSet<>();

// }
