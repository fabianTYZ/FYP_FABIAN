package com.example.backend.Services.MessageService;

import com.example.backend.Payload.req.ReqMessage;
import org.springframework.http.HttpEntity;

import java.util.UUID;

public interface MessageService {

    HttpEntity<?> sendMessage(ReqMessage reqMessage);

    HttpEntity<?> getMessage(UUID senderId, UUID receiverId);
}
