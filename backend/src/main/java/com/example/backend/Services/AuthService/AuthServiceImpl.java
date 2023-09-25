package com.example.backend.Services.AuthService;

import com.example.backend.DTO.UserDTO;
import com.example.backend.Entity.Role;
import com.example.backend.Entity.User;
import com.example.backend.Enums.UserRoles;
import com.example.backend.Repository.RoleRepo;
import com.example.backend.Repository.UserRepo;
import com.example.backend.Security.JwtService;
import com.example.backend.exceptions.InvalidCredentialsException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepo usersRepository;
    private final RoleRepo roleRepo;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;


    @Transactional
    @SneakyThrows
    @Override
    public HttpEntity<?> register(UserDTO userDTO) {
        List<Role> roles = new ArrayList<>();
        List<Role> roleUser = roleRepo.findAllByName(UserRoles.ROLE_STUDENT);
        if (roleUser == null) {
            roles.add(roleRepo.save(new Role(1, UserRoles.ROLE_STUDENT)));
        } else {
            roles.add(roleUser.get(0));
        }
        User user = new User(
                userDTO.getName(),
                userDTO.getEmail(),
                passwordEncoder.encode(userDTO.getPassword()),
                roles
        );
        User save = usersRepository.save(user);
        return ResponseEntity.ok(save);
    }


    @Override
    public HttpEntity<?> login(UserDTO userDTO) {
        Optional<User> users = usersRepository.findByEmail(userDTO.getEmail());
        if (users.isEmpty()) throw new InvalidCredentialsException();
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userDTO.getEmail(), userDTO.getPassword()));
        } catch (BadCredentialsException e) {
            throw new InvalidCredentialsException();
        }
        System.out.println(userDTO.getEmail());
        User userByEmail = users.orElseThrow();
        Map<String, Object> map = new HashMap<>();
        map.put("access_token", jwtService.generateJwtToken(userByEmail));
        map.put("refresh_token", jwtService.generateJwtRefreshToken(userByEmail));
        System.out.println(userByEmail.getRoles());
        map.put("roles", userByEmail.getRoles());
        return ResponseEntity.ok(map);
    }


    @Override
    public HttpEntity<?> refreshToken(String refreshToken) {
        String id = jwtService.extractSubjectFromJwt(refreshToken);
        User users = usersRepository.findById(UUID.fromString(id)).orElseThrow();
        String access_token = jwtService.generateJwtToken(users);
        return ResponseEntity.ok(access_token);
    }

    @Override
    public User decode(String token) {
        boolean isExpired = jwtService.validateToken(token);
        User user = null;
        if (isExpired) {
            String userId = jwtService.extractSubjectFromJwt(token);
            user = usersRepository.findById(UUID.fromString(userId)).orElseThrow(() -> new RuntimeException("Cannot find User With Id:" + userId));
        }
        return user;
    }
}
