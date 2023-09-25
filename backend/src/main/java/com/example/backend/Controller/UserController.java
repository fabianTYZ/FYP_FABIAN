package com.example.backend.Controller;


import com.example.backend.DTO.UserDTO;
import com.example.backend.Services.UserService.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;

    @PutMapping("/{id}")
    public HttpEntity<?> editUser(@PathVariable UUID id, @RequestBody UserDTO userDTO) {
        return userService.editUser(id, userDTO);
    }

    @GetMapping
    public HttpEntity<?> getAllUsers(@RequestParam UUID myId){
        return userService.findAllUsers(myId);
    }
}
