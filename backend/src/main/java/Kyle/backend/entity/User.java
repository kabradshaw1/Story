package Kyle.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "user")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerateType.IDENTITY)
    @Column(name = "id")
    priviate Long id;
}
