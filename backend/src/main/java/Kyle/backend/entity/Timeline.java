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
@Table(name = "timeline")
@Data
@NoArgsConstructor
public class Timeline implements Ownable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @Column(name = "username")
  @CreatedBy
  private String username;

  @Column(name = "date_created")
  @CreationTimestamp
  private Date dateCreated;

  @Column(name = "date_modified")
  @LastModifiedDate
  private Date dateModified;

  @Column(name = "timeline")
  private Integer timeline;

  @OneToMany(mappedBy = "timelineStart", cascade = CascadeType.ALL)
  private Set<Scene> beginEnd = new HashSet<>();

  @OneToMany(mappedBy = "timelineEnd", cascade = CascadeType.ALL)
  private Set<Scene> sceneEnd = new HashSet<>();
}
