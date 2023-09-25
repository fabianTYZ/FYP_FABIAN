package com.example.backend.Repository;

import com.example.backend.Entity.CourseUser;
import com.example.backend.Projection.CourseProjection;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface CourseUserRepo extends JpaRepository<CourseUser, UUID> {
    @Query(value = """
       SELECT cu.course.id as id, cu.user.id as userId, cu.course.name as courseName, cu.course.description as courseDescription from CourseUser cu
       WHERE cu.user.id =:userId
""")
    List<CourseProjection> getCoursesAndVideosByUserId(@Param("userId") UUID userId);

    @Modifying
    @Transactional
    @Query(value = """
        UPDATE UserVideos us SET us.isFinished=true WHERE us.user.id=:userId AND us.courseVideo.id =:youtubeId
""")
    void updateFinishedVideosByUserId(UUID userId, UUID youtubeId);

    CourseUser findByUserIdAndCourseId(UUID userId, UUID courseId);
}