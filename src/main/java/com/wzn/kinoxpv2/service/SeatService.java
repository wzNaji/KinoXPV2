package com.wzn.kinoxpv2.service;

import com.wzn.kinoxpv2.entity.Seat;

import java.util.List;

public interface SeatService {
    List<Seat> getAvailableSeatsForCinemaHall(Long cinemaHallId);

    boolean reserveSeats(Long cinemaHallId, List<Long> seatIds);
}


