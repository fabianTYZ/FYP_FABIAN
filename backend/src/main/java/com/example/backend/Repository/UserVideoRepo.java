package com.example.backend.Repository;

import com.example.backend.Entity.UserVideos;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface UserVideoRepo extends JpaRepository<UserVideos, UUID> {


    List<UserVideos> findAllByUserId(UUID userId);
}
