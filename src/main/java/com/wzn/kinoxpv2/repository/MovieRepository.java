package com.wzn.kinoxpv2.repository;

import com.wzn.kinoxpv2.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovieRepository extends JpaRepository<Movie,Long> {
}
