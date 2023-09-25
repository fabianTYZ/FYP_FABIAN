package com.example.backend.Services.CommentsService;

import com.example.backend.Payload.req.ReqComments;
import org.springframework.http.HttpEntity;

import java.util.UUID;

public interface CommentsService {

    HttpEntity<?> saveComments(ReqComments reqComments);

    HttpEntity<?> getCommentsByVideoId(UUID videoId);
}
