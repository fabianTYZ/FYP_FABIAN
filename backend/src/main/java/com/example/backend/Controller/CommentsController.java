package com.example.backend.Controller;

import com.example.backend.Payload.req.ReqComments;
import com.example.backend.Services.CommentsService.CommentsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
public class CommentsController {
    private final CommentsService commentsService;

    @PostMapping
    HttpEntity<?> saveComments(@RequestBody ReqComments reqComments) {
        return commentsService.saveComments(reqComments);
    }

    @GetMapping
    HttpEntity<?> getComments(@RequestParam UUID videoId){
        return commentsService.getCommentsByVideoId(videoId);
    }
}
