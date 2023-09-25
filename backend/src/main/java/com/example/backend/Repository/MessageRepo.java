package com.example.backend.Repository;

import com.example.backend.Entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface MessageRepo extends JpaRepository<Message, UUID> {
    @Query("SELECT m FROM Message m " +
            "WHERE (m.sender.id = :senderId AND m.receiver.id = :receiverId) " +
            "OR (m.sender.id = :receiverId AND m.receiver.id = :senderId) " +
            "ORDER BY m.time")
    List<Message> findMessagesBySenderAndReceiver(UUID senderId, UUID receiverId);
}