package com.wzn.kinoxpv2.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
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
    @JoinColumn(name = "cinema_hall_id") // foreign key column.
    @JsonBackReference  // Prevents back-reference serialization to avoid infinite recursion
    private CinemaHall cinemaHall;

    @OneToMany(mappedBy = "movie", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<TimeTable> timeTables; // List of showtimes for this movie

    public Movie (String title, String genre, int duration, int ageLimit) {
        this.title = title;
        this.genre = genre;
        this.duration = duration;
        this.ageLimit = ageLimit;
    }
}
