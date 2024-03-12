package Kyle.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.util.Date;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "username")
    private String username;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "is_admin")
    private Boolean isAdmin = false;

    @Column(name = "date_created")
    @CreationTimestamp
    private Date dateCreated;

    @Column(name = "date_modified")
    @LastModifiedDate
    private Date dateModified;

    public User(String username, String password, String email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }
}

// package Kyle.backend.entity;

// import jakarta.persistence.*;
// import lombok.Data;
// import lombok.NoArgsConstructor;
// import org.hibernate.annotations.CreationTimestamp;
// import org.springframework.data.annotation.LastModifiedDate;
// import org.springframework.data.jpa.domain.support.AuditingEntityListener;

// import java.util.Date;

// @Entity
// @Table(name = "users")
// @Data
// @NoArgsConstructor
// @EntityListeners(AuditingEntityListener.class)
// public class User {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     @Column(name = "id")
//     private Long id;

//     @Column(name = "name")
//     private String name;

//     @Column(name = "email")
//     private String email;

//     @Column(name = "password")
//     private String password;

//     @Column(name = "is_admin")
//     private Boolean isAdmin = false;

//     @Column(name = "date_created")
//     @CreationTimestamp
//     private Date dateCreated;

//     @Column(name = "date_modified")
//     @LastModifiedDate
//     private Date dateModified;

//     public User(String name, String password, String email) {
//         this.name = name;
//         this.password = password;
//         this.email = email;
//     }
// }
