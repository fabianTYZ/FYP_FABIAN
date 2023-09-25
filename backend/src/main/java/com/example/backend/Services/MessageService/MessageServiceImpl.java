package com.example.backend.Services.MessageService;

import com.example.backend.Entity.Message;
import com.example.backend.Entity.User;
import com.example.backend.Payload.req.ReqMessage;
import com.example.backend.Repository.MessageRepo;
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
public class MessageServiceImpl implements MessageService {

    private final MessageRepo messageRepo;
    private final UserRepo userRepo;

    @Override
    public HttpEntity<?> sendMessage(ReqMessage reqMessage) {
        User sender = userRepo.findById(reqMessage.getSenderId()).orElseThrow(() -> new NoSuchElementException("User not found with ID: " + reqMessage.getSenderId()));
        User receiver = userRepo.findById(reqMessage.getReceiverId()).orElseThrow(() -> new NoSuchElementException("User not found with ID: " + reqMessage.getReceiverId()));
        Message save = messageRepo.save(
                new Message(
                        sender,
                        receiver,
                        reqMessage.getMessage(),
                        LocalDateTime.now()
                )
        );
        return ResponseEntity.ok(save);
    }

    @Override
    public HttpEntity<?> getMessage(UUID senderId, UUID receiverId) {
        List<Message> messages =  messageRepo.findMessagesBySenderAndReceiver(senderId, receiverId);
        return ResponseEntity.ok(messages);
    }
}