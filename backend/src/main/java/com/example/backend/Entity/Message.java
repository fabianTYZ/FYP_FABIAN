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
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne
    private User sender;

    @ManyToOne
    private User receiver;

    private String message;

    private LocalDateTime time;

    public Message(User sender, User receiver, String message, LocalDateTime time) {
        this.sender = sender;
        this.receiver = receiver;
        this.message = message;
        this.time = time;
    }
}
