package com.wzn.kinoxpv2.controller;

import com.wzn.kinoxpv2.entity.Movie;
import com.wzn.kinoxpv2.service.MovieService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movies")
public class MovieController {

    private final MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createMovie(@RequestBody Movie movie) {
        try {
            Movie newMovie = movieService.createMovie(movie);
            return ResponseEntity.ok(newMovie);  // Return the created movie with HTTP 200
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating movie: " + e.getMessage());
        }
    }

    @GetMapping("/movieList")
    public ResponseEntity<List<Movie>> getAllMovies() {
        try {
            List<Movie> allMovies = movieService.findAllMovies();

            if (allMovies.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else {
                return new ResponseEntity<>(allMovies, HttpStatus.OK);
            }
        } catch (Exception e) {
            System.out.println("Error:" + e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);  // Indicate server error
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteMovie(@PathVariable Long id) {
        try {
            boolean isDeleted = movieService.deleteMovie(id);
            if (isDeleted) {
                return ResponseEntity.ok().body("Movie successfully deleted");
            } else {
                return ResponseEntity.badRequest().body("Movie not found");
            }
        } catch (IllegalArgumentException | EntityNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Internal Server Error");
        }
    }

    @GetMapping("/{movieId}")
    public ResponseEntity<Movie> getMovieById(@PathVariable Long movieId) {
        try {
            Movie movie = movieService.findMovieById(movieId);
            return ResponseEntity.ok(movie); // Return 200 OK with the movie
        } catch (IllegalArgumentException ex) {
            // Handle case where the movie is not found
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception ex) {
            // Handle generic exceptions
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

}
