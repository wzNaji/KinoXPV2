package com.wzn.kinoxpv2.repository;

import com.wzn.kinoxpv2.entity.TimeTable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TimeTableRepository extends JpaRepository<TimeTable, Long> {

    TimeTable getTimeTableByMovieId(Long movieId);

}
