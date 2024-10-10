package com.wzn.kinoxpv2.repository;

import com.wzn.kinoxpv2.entity.Seat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SeatRepository extends JpaRepository<Seat, Long> {

    List<Seat> findByCinemaHallId(Long cinemaHallId);

}
