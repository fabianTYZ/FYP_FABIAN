package com.example.backend.Entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Comments {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    private User user;

    @ManyToOne
    private CourseVideo courseVideo;

    private String message;

    private LocalDateTime time;

    public Comments(User user, CourseVideo courseVideo, String message, LocalDateTime time) {
        this.user = user;
        this.courseVideo = courseVideo;
        this.message = message;
        this.time = time;
    }
}
