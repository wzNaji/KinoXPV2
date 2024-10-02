package com.wzn.kinoxpv2.service;

import com.wzn.kinoxpv2.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    User findUserById(Long id);
    User createUser(User user);
    void editUser(Long userId, User userDetails);
    void deleteUser(Long userId);
    List<User> findAllUsers();
    boolean checkLogin(String username, String password);
    User findUserByUsername(String username);

}
