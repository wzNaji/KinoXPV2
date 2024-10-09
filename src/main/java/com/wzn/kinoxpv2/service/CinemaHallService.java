package com.wzn.kinoxpv2.service;

import com.wzn.kinoxpv2.entity.CinemaHall;
import com.wzn.kinoxpv2.entity.TheaterType;

public interface CinemaHallService {

    CinemaHall findCinemaHallByTheaterType(TheaterType theaterType);

}
