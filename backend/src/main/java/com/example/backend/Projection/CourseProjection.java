package com.example.backend.Projection;

import org.springframework.beans.factory.annotation.Value;

import java.util.List;
import java.util.UUID;

public interface CourseProjection {
    UUID getId();

    UUID getUserId();

    String getCourseName();

    String getCourseDescription();

    @Value("#{@courseVideoRepo.findVideos(target.id,target.userId)}")
    List<VideoProjection> getCourseVideo();
}
