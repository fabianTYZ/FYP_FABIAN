package com.example.backend.Repository;

import com.example.backend.Entity.CourseVideo;
import com.example.backend.Projection.VideoProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface CourseVideoRepo extends JpaRepository<CourseVideo, UUID> {
    @Query("""
SELECT uv.courseVideo.id as id, uv.courseVideo.name as name, uv.courseVideo.youtubeId as youtubeId, uv.isFinished as isFinished 
from UserVideos uv 
where uv.user.id  = :userId and uv.courseVideo.course.id = :courseId
""")
    List<VideoProjection> findVideos(UUID courseId, UUID userId);

    List<CourseVideo> findAllByCourseId(UUID courseId);
}
