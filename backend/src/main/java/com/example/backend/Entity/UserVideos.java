package com.example.backend.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"course_video_id", "user_id"}))
public class UserVideos {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "course_video_id")
    private CourseVideo courseVideo;

    private Boolean isFinished;

    public UserVideos(User user, CourseVideo courseVideo, Boolean isFinished) {
        this.user = user;
        this.courseVideo = courseVideo;
        this.isFinished = isFinished;
    }
}
