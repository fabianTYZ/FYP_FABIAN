package com.example.backend.Services.CourseService;

import org.springframework.http.HttpEntity;

import java.util.UUID;

public interface CourseService {
    HttpEntity<?> getCourses();

    HttpEntity<?> saveCoursesToUserCache(UUID userId, UUID courseId);

    HttpEntity<?> getCoursesByUserId(UUID userId);

    HttpEntity<?> updateFinishedVideos(UUID userId, UUID youtubeId);

    HttpEntity<?> deleteCoursesFromUserCache(UUID userId, UUID courseId);
}
