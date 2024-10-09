package com.wzn.kinoxpv2.service.implementation;

import com.wzn.kinoxpv2.entity.TimeTable;
import com.wzn.kinoxpv2.repository.TimeTableRepository;
import com.wzn.kinoxpv2.service.TimeTableService;
import org.springframework.stereotype.Service;

@Service
public class TimeTableServiceImpl implements TimeTableService {

    private final TimeTableRepository timeTableRepository;

    public TimeTableServiceImpl(TimeTableRepository timeTableRepository) {
        this.timeTableRepository = timeTableRepository;
    }


    @Override
    public TimeTable getTimeTableByMovieId(Long movieId) {
        try {
            return timeTableRepository.getTimeTableByMovieId(movieId);
        } catch (IllegalArgumentException e) {
            System.out.println("Error: " + e.getMessage());
            return null;
        }
    }

}
