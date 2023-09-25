package com.example.backend.Services.UserService;

import com.example.backend.DTO.UserDTO;
import com.example.backend.Entity.User;
import com.example.backend.Repository.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepo userRepo;

    @Override
    public HttpEntity<?> editUser(UUID id, UserDTO userDTO) {
        Optional<User> optionalUser = userRepo.findById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setName(userDTO.getName());
            user.setBio(userDTO.getBio());
            user.setEmail(userDTO.getEmail());
            user.setNickname(userDTO.getNickname());
            User save = userRepo.save(user);
            return ResponseEntity.ok(save);
        }
        return ResponseEntity.ok("Something went wrong");
    }

    @Override
    public HttpEntity<?> findAllUsers(UUID myId) {
        List<User> users = userRepo.findAllByIdIsNot(myId);
        return ResponseEntity.ok(users);
    }
}
