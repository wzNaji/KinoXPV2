package com.wzn.kinoxpv2.controller;

import com.wzn.kinoxpv2.entity.TimeTable;
import com.wzn.kinoxpv2.service.TimeTableService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/timetables")
public class TimeTableController {

    private final TimeTableService timeTableService;

    public TimeTableController(TimeTableService timeTableService) {
        this.timeTableService = timeTableService;
    }

    // Get timetable by movieId
    @GetMapping("/movie/{movieId}")
    public ResponseEntity<TimeTable> getTimeTableByMovieId(@PathVariable Long movieId) {
        TimeTable timeTable = timeTableService.getTimeTableByMovieId(movieId);

        if (timeTable != null) {
            return ResponseEntity.ok(timeTable);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

