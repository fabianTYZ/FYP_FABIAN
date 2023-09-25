package com.example.backend.Services.CourseService;

import com.example.backend.Entity.*;
import com.example.backend.Projection.CourseProjection;
import com.example.backend.Repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CourseServiceImpl implements CourseService {
    private final CourseRepo courseRepo;
    private final CourseUserRepo courseUserRepo;
    private final UserRepo userRepo;
    private final CourseVideoRepo courseVideoRepo;
    private final UserVideoRepo userVideoRepo;

    @Override
    public HttpEntity<?> getCourses() {
        return ResponseEntity.ok(courseRepo.findAll());
    }

    @Override
    @Transactional
    public HttpEntity<?> saveCoursesToUserCache(UUID userId, UUID courseId) {
        Course course = courseRepo.findById(courseId)
                .orElseThrow(() -> new NoSuchElementException("Course not found with ID:" + courseId));
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new NoSuchElementException("User not found with ID: " + userId));
        CourseUser courseUser = courseUserRepo.save(
                new CourseUser(
                        course,
                        user
                )
        );
        List<CourseVideo> courseVideos = courseVideoRepo.findAllByCourseId(courseId);
        System.out.println(courseVideos);
        for (CourseVideo courseVideo : courseVideos) {
            userVideoRepo.save(
                    new UserVideos(
                            user,
                            courseVideo,
                            false
                    )
            );
        }
        return ResponseEntity.ok(courseUser);
    }

    @Transactional
    @Override
    public HttpEntity<?> deleteCoursesFromUserCache(UUID userId, UUID courseId) {
        CourseUser courseUser = courseUserRepo.findByUserIdAndCourseId(userId, courseId);
        List<UserVideos> userVideos = userVideoRepo.findAllByUserId(userId);
        for (UserVideos userVideo : userVideos) {
            if (userVideo.getUser().getId().equals(userId) && userVideo.getCourseVideo().getCourse().getId().equals(courseId)){
                userVideoRepo.delete(userVideo);
            }
        }
        courseUserRepo.delete(courseUser);
        return ResponseEntity.ok("deleted!");
    }


    @Override
    public HttpEntity<?> getCoursesByUserId(UUID userId) {
        List<CourseProjection> courses = courseUserRepo.getCoursesAndVideosByUserId(userId);
        return ResponseEntity.ok(courses);
    }

    @Override
    public HttpEntity<?> updateFinishedVideos(UUID userId, UUID youtubeId) {
        courseUserRepo.updateFinishedVideosByUserId(userId, youtubeId);
        return ResponseEntity.ok("updated");
    }
}
