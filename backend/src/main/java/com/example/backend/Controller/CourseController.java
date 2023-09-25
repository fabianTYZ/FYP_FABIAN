package com.example.backend.Controller;


import com.example.backend.Services.CourseService.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/course")
public class CourseController {
    private final CourseService courseService;

    @GetMapping
    public HttpEntity<?> getCourses() {
        return courseService.getCourses();
    }

    @PostMapping
    public HttpEntity<?> saveCoursesToUserCache(@RequestParam UUID userId, @RequestParam UUID courseId) {
        return courseService.saveCoursesToUserCache(userId, courseId);
    }

    @DeleteMapping
    public HttpEntity<?> deleteCoursesByUserId(@RequestParam UUID userId, @RequestParam UUID courseId) {
        return courseService.deleteCoursesFromUserCache(userId, courseId);
    }

    @GetMapping("/video")
    public HttpEntity<?> getCoursesByUserId(@RequestParam UUID userId) {
        return courseService.getCoursesByUserId(userId);
    }

    @PutMapping
    public HttpEntity<?> updateFinishedVideos(@RequestParam UUID userId, @RequestParam UUID youtubeId) {
        return courseService.updateFinishedVideos(userId, youtubeId);
    }
}
