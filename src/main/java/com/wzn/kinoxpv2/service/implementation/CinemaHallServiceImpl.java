package com.wzn.kinoxpv2.service.implementation;

import com.wzn.kinoxpv2.entity.CinemaHall;
import com.wzn.kinoxpv2.entity.TheaterType;
import com.wzn.kinoxpv2.repository.CinemaHallRepository;
import com.wzn.kinoxpv2.service.CinemaHallService;
import org.springframework.stereotype.Service;

@Service
public class CinemaHallServiceImpl implements CinemaHallService {

    private final CinemaHallRepository cinemaHallRepository;

    public CinemaHallServiceImpl(CinemaHallRepository cinemaHallRepository) {
        this.cinemaHallRepository = cinemaHallRepository;
    }
    @Override
    public CinemaHall findCinemaHallByTheaterType(TheaterType theaterType) {
        return cinemaHallRepository.findCinemaHallByTheaterType(theaterType);
    }
}
