package com.example.backend.Projection;

import java.time.LocalDateTime;
import java.util.UUID;

public interface CommentsProjection {
    UUID getId();

    String getMessage();


    LocalDateTime getTime();

    UserProjection getUser();
}
