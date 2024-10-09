package com.wzn.kinoxpv2.service;

import com.wzn.kinoxpv2.entity.TimeTable;

public interface TimeTableService {

    TimeTable getTimeTableByMovieId(Long movieId);

}
