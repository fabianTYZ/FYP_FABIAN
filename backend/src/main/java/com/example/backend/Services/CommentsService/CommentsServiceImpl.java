package com.example.backend.Services.CommentsService;

import com.example.backend.Entity.Comments;
import com.example.backend.Entity.CourseVideo;
import com.example.backend.Entity.User;
import com.example.backend.Payload.req.ReqComments;
import com.example.backend.Projection.CommentsProjection;
import com.example.backend.Repository.CommentsRepo;
import com.example.backend.Repository.CourseVideoRepo;
import com.example.backend.Repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CommentsServiceImpl implements CommentsService {
    private final CommentsRepo commentsRepo;
    private final UserRepo userRepo;
    private final CourseVideoRepo courseVideoRepo;

    @Override
    public HttpEntity<?> saveComments(ReqComments reqComments) {
        User user = userRepo.findById(reqComments.getUserId()).orElseThrow(() -> new NoSuchElementException("Cannot find User With Id: " + reqComments.getUserId()));
        CourseVideo courseVideo = courseVideoRepo.findById(reqComments.getVideoId()).orElseThrow(() -> new NoSuchElementException("Cannot find video with Id" + reqComments.getVideoId()));
        Comments save = commentsRepo.save(
                new Comments(
                        user,
                        courseVideo,
                        reqComments.getMessage(),
                        LocalDateTime.now()
                )
        );
        return ResponseEntity.ok(save);
    }

    @Override
    public HttpEntity<?> getCommentsByVideoId(UUID videoId) {
        List<CommentsProjection> comments = commentsRepo.findAllByCourseVideoIdOrderByTime(videoId);
        return ResponseEntity.ok(comments);
    }
}