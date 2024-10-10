package com.wzn.kinoxpv2.service.implementation;

import com.wzn.kinoxpv2.entity.Seat;
import com.wzn.kinoxpv2.repository.SeatRepository;
import com.wzn.kinoxpv2.service.SeatService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SeatServiceImpl implements SeatService {
    private final SeatRepository seatRepository;

    public SeatServiceImpl(SeatRepository seatRepository) {
        this.seatRepository = seatRepository;
    }

    @Override
    public List<Seat> getAvailableSeatsForCinemaHall(Long cinemaHallId) {
        return seatRepository.findByCinemaHallId(cinemaHallId);
    }

    @Override
    public boolean reserveSeats(Long cinemaHallId, List<Long> seatIds) {
        // Find the seats that the user wants to reserve using the seat IDs
        List<Seat> seatsToReserve = seatRepository.findAllById(seatIds);
        // Check if all the seats are available (i.e., none of them are reserved)
        for (Seat seat : seatsToReserve) {
            if (seat.isReserved()) {
                // If any seat is already reserved, return false (reservation fails)
                return false;
            }
        }
        // If all seats are available, mark them as reserved
        for (Seat seat : seatsToReserve) {
            seat.setReserved(true);  // Set the seat as reserved
        }
        // Save the updated seat information to the database
        seatRepository.saveAll(seatsToReserve);
        //Return true to indicate the reservation was successful
        return true;
    }
}


