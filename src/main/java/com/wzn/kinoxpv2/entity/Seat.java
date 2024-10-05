package com.wzn.kinoxpv2.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Seat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    boolean isReserved;

    private int rowNumber;

    private int seatNumber;

    @ManyToOne
    @JoinColumn(name = "cinema_hall_id")
    private CinemaHall cinemaHall;

}
