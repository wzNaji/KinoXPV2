package com.wzn.kinoxpv2.controller;

import com.wzn.kinoxpv2.entity.CinemaHall;
import com.wzn.kinoxpv2.entity.Movie;
import com.wzn.kinoxpv2.entity.TheaterType;
import com.wzn.kinoxpv2.repository.MovieRepository;
import com.wzn.kinoxpv2.service.CinemaHallService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/cinema/halls")
public class CinemaHallController {

    private final CinemaHallService cinemaHallService;
    private final MovieRepository movieRepository;

    public CinemaHallController(CinemaHallService cinemaHallService, MovieRepository movieRepository) {
        this.cinemaHallService = cinemaHallService;
        this.movieRepository = movieRepository;
    }

    @GetMapping("/size/{size}")
    public ResponseEntity<CinemaHall> getCinemaHallBySize(@PathVariable String size) {
        TheaterType theaterType;
        if ("small".equalsIgnoreCase(size)) {
            theaterType = TheaterType.SMALL;
        } else if ("large".equalsIgnoreCase(size)) {
            theaterType = TheaterType.LARGE;
        } else {
            return ResponseEntity.badRequest().build();  // Invalid size
        }

        CinemaHall cinemaHall = cinemaHallService.findCinemaHallByTheaterType(theaterType);
        if (cinemaHall != null) {
            return ResponseEntity.ok(cinemaHall);
        } else {
            return ResponseEntity.notFound().build();  // No CinemaHall found
        }
    }

    @GetMapping("/{movieId}")
    public ResponseEntity<Long> getCinemaHallIdByMovieId(@PathVariable Long movieId) {
        Movie movie = movieRepository.findById(movieId).orElse(null);
        if (movie == null) {
            return ResponseEntity.notFound().build();  // Return 404 if movie is not found
        }
        Long cinemaHallId = movie.getCinemaHall().getId();
        System.out.println(cinemaHallId);
        return ResponseEntity.ok(cinemaHallId);  // Return cinemaHallId with a 200 OK response
    }

}

