package com.example.backend.Payload.req;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ReqComments {
    private UUID userId;

    private UUID videoId;

    private String message;
}
