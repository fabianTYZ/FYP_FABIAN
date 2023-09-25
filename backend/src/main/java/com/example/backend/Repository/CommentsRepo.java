package com.example.backend.Repository;

import com.example.backend.Entity.Comments;
import com.example.backend.Projection.CommentsProjection;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface CommentsRepo extends JpaRepository<Comments, UUID> {

    List<CommentsProjection> findAllByCourseVideoIdOrderByTime(UUID videoId);
}
