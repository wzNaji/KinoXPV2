package com.wzn.kinoxpv2.controller;


import com.wzn.kinoxpv2.entity.Seat;
import com.wzn.kinoxpv2.service.SeatService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/seats")
public class SeatController {

    private final SeatService seatService;

    public SeatController(SeatService seatService) {
        this.seatService = seatService;
    }

    // Get available seats for a movie
    @GetMapping("/{cinemaHallId}/seats")
    public ResponseEntity<List<Seat>> getAvailableSeats(@PathVariable Long cinemaHallId) {
        List<Seat> seats = seatService.getAvailableSeatsForCinemaHall(cinemaHallId);
        return new ResponseEntity<>(seats, HttpStatus.OK);
    }

    // Reserve selected seats
    @PostMapping("/{cinemaHallId}/reserve")
    public ResponseEntity<String> reserveSeats(@PathVariable Long cinemaHallId, @RequestBody List<Long> seatIds) {
        boolean success = seatService.reserveSeats(cinemaHallId, seatIds);
        if (success) {
            return new ResponseEntity<>("Reservation successful", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Reservation failed", HttpStatus.BAD_REQUEST);
        }
    }
}
