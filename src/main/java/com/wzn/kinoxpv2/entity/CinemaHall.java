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
public class CinemaHall {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int cinemaHallRows;

    @OneToMany(mappedBy = "cinemaHall" ,fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE})
    private List<Seat> seats;

    @OneToMany(mappedBy = "cinemaHall" ,fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE})
    private List<Movie> movies;

    @OneToMany(mappedBy = "cinemaHall", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<TimeTable> timeTables; // Showtimes scheduled in this hall

    @Column(nullable = false)
    @Enumerated(EnumType.STRING) // Enum bliver gemt som en String i databasen.
    private TheaterType theaterType;

}
