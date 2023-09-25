package com.example.backend.Projection;

import java.util.UUID;

public interface VideoProjection {
    UUID getId();

    String getName();

    Boolean getIsFinished();

    String getYoutubeId();
}
