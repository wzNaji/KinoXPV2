package com.wzn.kinoxpv2.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Seat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private boolean isReserved;

    @Column(nullable = false)
    private int rowNum;

    @Column(nullable = false)
    private int seatNumber;
/*
    @ManyToOne
    @JoinColumn(name = "time_table_id", nullable = false)
    private TimeTable timeTable;

 */

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cinema_hall_id", nullable = false)
    @JsonBackReference
    private CinemaHall cinemaHall;

}
