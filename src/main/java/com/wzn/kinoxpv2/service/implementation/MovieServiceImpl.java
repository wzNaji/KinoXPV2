package com.wzn.kinoxpv2.service.implementation;

import com.wzn.kinoxpv2.entity.Movie;
import com.wzn.kinoxpv2.repository.MovieRepository;
import com.wzn.kinoxpv2.service.MovieService;

import java.util.List;

import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MovieServiceImpl implements MovieService {

    private final MovieRepository movieRepository;

    public MovieServiceImpl(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    @Override
    @Transactional
    public Movie createMovie(Movie movie) {
        try {
            return movieRepository.save(movie);
        } catch (RuntimeException e) {
            throw new RuntimeException("Unable to create the movie due to a server error.");
        }
    }

    @Override
    @Transactional
    public boolean deleteMovie(Long movieId) {
        return movieRepository.findById(movieId)
                .map(movie -> {
                    movieRepository.delete(movie);
                    return true;
                })
                .orElse(false);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Movie> findAllMovies() {
        List<Movie> allMovies = movieRepository.findAll();

        if (allMovies.isEmpty()) {
            throw new IllegalArgumentException("Listen af film blev ikke fundet");
        }
        return allMovies;
    }

    @Override
    public Movie findMovieById(Long movieId) {
        try {
            return movieRepository.findById(movieId)
                    .orElseThrow(() -> new IllegalArgumentException("Movie with ID " + movieId + " not found"));
        } catch (IllegalArgumentException ex) {
            System.err.println(ex.getMessage()); // Log the error
            throw ex;
        } catch (DataAccessException ex) {
            System.err.println("Database error: " + ex.getMessage());
            throw ex;
        }
    }


}
