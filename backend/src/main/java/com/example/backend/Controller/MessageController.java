package com.example.backend.Controller;

import com.example.backend.Payload.req.ReqMessage;
import com.example.backend.Services.MessageService.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/message")
public class MessageController {
    private final MessageService messageService;

    @PostMapping
    public HttpEntity<?> sendMessage(@RequestBody ReqMessage reqMessage) {
        return messageService.sendMessage(reqMessage);
    }

    @GetMapping
    public HttpEntity<?> getMessage(@RequestParam UUID senderId, @RequestParam UUID receiverId) {
        return messageService.getMessage(senderId, receiverId);
    }
}
