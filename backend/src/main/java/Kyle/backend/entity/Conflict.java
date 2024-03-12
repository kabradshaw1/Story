// package Kyle.backend.entity;

// import java.util.Date;
// import java.util.Set;

// import org.hibernate.annotations.CreationTimestamp;
// import org.springframework.data.annotation.CreatedBy;
// import org.springframework.data.annotation.LastModifiedDate;

// import jakarta.persistence.*;
// import lombok.Data;
// import lombok.NoArgsConstructor;

// @Entity
// @Table(name = "conflicts")
// @Data
// @NoArgsConstructor
// public class Conflict {

//   @Id
//   @GeneratedValue(strategy = GenerationType.IDENTITY)
//   @Column(name = "id")
//   private Long id;

//   @Column(name = "name")
//   private String name;

//   @Column(name = "username")
//   @CreatedBy
//   private String username;

//   @Column(name = "date_created")
//   @CreationTimestamp
//   private Date dateCreated;

//   @Column(name = "date_modified")
//   @LastModifiedDate
//   private Date dateModified;

//   private Set<Population> populations;

//   private Set<Organization> organizations;

// }
