package com.example.backend.Services.UserService;

import com.example.backend.DTO.UserDTO;
import org.springframework.http.HttpEntity;

import java.util.UUID;

public interface UserService {

    HttpEntity<?> editUser(UUID id, UserDTO userDTO);

    HttpEntity<?> findAllUsers(UUID myId);
}