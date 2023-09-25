package com.example.backend.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

    private String name;

    private String email;

    private String nickname;

    private String bio;

    private String password;

    private boolean rememberMe;
}
