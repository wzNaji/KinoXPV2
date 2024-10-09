package com.wzn.kinoxpv2.service;

import com.wzn.kinoxpv2.entity.Movie;

import java.util.List;

public interface MovieService {

    Movie createMovie (Movie movie);
    boolean deleteMovie (Long movieId);

    List<Movie> findAllMovies();

    Movie findMovieById(Long movieId);

}
