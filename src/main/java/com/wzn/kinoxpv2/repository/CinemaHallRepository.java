package com.wzn.kinoxpv2.repository;

import com.wzn.kinoxpv2.entity.CinemaHall;
import com.wzn.kinoxpv2.entity.TheaterType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CinemaHallRepository extends JpaRepository<CinemaHall, Long> {

    CinemaHall findCinemaHallByTheaterType(TheaterType theaterType);

}
