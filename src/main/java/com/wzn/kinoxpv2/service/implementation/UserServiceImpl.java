package com.wzn.kinoxpv2.service.implementation;

import com.wzn.kinoxpv2.entity.User;
import com.wzn.kinoxpv2.enums.Role;
import com.wzn.kinoxpv2.repository.UserRepository;
import com.wzn.kinoxpv2.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User findUserById(Long id) {
        // Error handling for at undgå unødige database handlinger
        if (id == null) {
            throw new IllegalArgumentException("Bruger ID blev ikke fundet");
        }

        Optional<User> optionalUser = userRepository.findById(id);

        if (optionalUser.isPresent()) {
            return optionalUser.get();  // Return User objektet
        } else {
            throw new RuntimeException("Brugeren blev ikke fundet");
        }

    }

    @Override
    public User createUser(User user) {
        user.setUserRole(Role.ADMIN);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Transactional
    @Override
    public void editUser(Long userId, User userDetails) {
        if (userId == null) {
            throw new IllegalArgumentException("Bruger ID blev ikke fundet");
        }

        Optional<User> optionalUserToUpdate = userRepository.findById(userId);

        // Error handling for at undgå unødige database handlinger
        if (optionalUserToUpdate.isEmpty()) {
            throw new EntityNotFoundException("Bruger blev ikke fundet med ID: " + userId);
        }

        User userToUpdate = optionalUserToUpdate.get();
        //Setter den eksisterende brugers attributer til nye værdier, så vi efterfølgende kan opdatere og gemme.
        userToUpdate.setUsername(userDetails.getUsername());
        userToUpdate.setUserRole(userDetails.getUserRole());

        userRepository.save(userToUpdate);
    }

    @Transactional
    @Override
    public void deleteUser(Long userId) {
        if (userId == null) {
            throw new IllegalArgumentException("Bruger ID blev ikke fundet");
        }

        Optional<User> optionalUserToDelete = userRepository.findById(userId);

        if (optionalUserToDelete.isPresent()) {
            userRepository.deleteById(userId);
        }
        else throw new RuntimeException("Bruger blev ikke fundet");
    }

    @Override
    public List<User> findAllUsers() {
        List<User> allUsers = userRepository.findAll();
        if(allUsers.isEmpty()){
            throw new IllegalArgumentException("Listen af brugere blev ikke fundet");
        }
        return allUsers;
    }

    @Override
    public boolean checkLogin(String username, String password) {
        Optional<User> userOptional = userRepository.findUserByUsername(username);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return passwordEncoder.matches(password, user.getPassword());
        }
        return false;
    }

    @Override
    public User findUserByUsername(String username) {
        Optional<User> optionalUser = userRepository.findUserByUsername(username);
        return optionalUser.orElse(null);
    }
}
