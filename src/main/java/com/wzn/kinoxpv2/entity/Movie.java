package com.wzn.kinoxpv2.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String genre;

    @Column(nullable = false)
    private int duration; // Længden i minutter

    @Column(nullable = false)
    private int ageLimit; // Aldersgrænse for film


    @ManyToOne
    @JoinColumn(name = "cinema_hall_id") // This establishes the foreign key column.
    private CinemaHall cinemaHall;

    @OneToMany(mappedBy = "movie", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<TimeTable> timeTables; // List of showtimes for this movie
}
