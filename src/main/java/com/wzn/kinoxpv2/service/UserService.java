package com.wzn.kinoxpv2.service;

import com.wzn.kinoxpv2.entity.User;

import java.util.List;

public interface UserService {

    User findUserById(Long id);
    User createUser(String username,String password);
    void editUser(Long userId, User userDetails);
    boolean deleteUser(Long userId);
    List<User> findAllUsers();
    boolean checkLogin(String username, String password);
    User findUserByUsername(String username);

}
