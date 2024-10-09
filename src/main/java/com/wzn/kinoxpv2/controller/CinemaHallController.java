package com.wzn.kinoxpv2.controller;

import com.wzn.kinoxpv2.entity.CinemaHall;
import com.wzn.kinoxpv2.entity.Seat;
import com.wzn.kinoxpv2.entity.TheaterType;
import com.wzn.kinoxpv2.service.CinemaHallService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/cinema/halls")
public class CinemaHallController {

    private final CinemaHallService cinemaHallService;

    public CinemaHallController(CinemaHallService cinemaHallService) {
        this.cinemaHallService = cinemaHallService;
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
}

