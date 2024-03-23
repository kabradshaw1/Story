package Kyle.backend.entity.temp;
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
// @Table(name = "regions")
// @Data
// @NoArgsConstructor
// public class Region implements Ownable {

//   @Id
//   @GeneratedValue(strategy = GenerationType.IDENTITY)
//   @Column(name = "id")
//   private Long id;

//   @Column(name = "title")
//   private String title;

//   @Column(name = "body")
//   private String body;

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
//     name = "region_organization",
//     joinColumns = @JoinColumn(name = "region_id"),
//     inverseJoinColumns = @JoinColumn(name = "organization_id")
//   )
//   private Set<Organization> organizations = new HashSet<>();

// }

  // @OneToMany(mappedBy = "location", cascade = CascadeType.ALL)
  // private Set<Location> locations = new HashSet<>();

  // // Utility methods to add location
  // public void addLocation(Location location) {
  //   if (location != null) {
  //     locations.add(location);
  //     location.setRegion(this);
  //   }
  // }