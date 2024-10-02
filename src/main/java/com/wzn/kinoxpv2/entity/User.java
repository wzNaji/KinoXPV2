package com.wzn.kinoxpv2.entity;

import com.wzn.kinoxpv2.enums.Role;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long userId;
    @Enumerated(EnumType.STRING)
    @Column(name = "user_role", nullable = false)
    private Role userRole; // Admin eller Worker

    @Column(name = "username", nullable = false, unique = true)
    private String username;

    @Column(name = "password", nullable = false)
    @ToString.Exclude
    private String password;


}
