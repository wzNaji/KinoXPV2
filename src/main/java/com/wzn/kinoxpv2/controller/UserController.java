package com.wzn.kinoxpv2.controller;

import com.wzn.kinoxpv2.config.AppConfig;
import com.wzn.kinoxpv2.entity.User;
import com.wzn.kinoxpv2.enums.Role;
import com.wzn.kinoxpv2.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // login
    @PostMapping("/login")
    public String isAuthenticated(@RequestBody Map<String, String> loginData,
                                  HttpSession session) {

        String username = loginData.get("username");
        String password = loginData.get("password");

        boolean authenticated = userService.checkLogin(username,password);

        if (authenticated) {
            User loggedInUser = userService.findUserByUsername(username);
            session.setAttribute("username", username);
            session.setAttribute("role", loggedInUser.getUserRole().name()); // '.name' for at få en String representation af role.
            return "Login Successful!";
        } else
            return "Login Failed. Please Try Again";
    }

    // Clear session
    @PostMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate(); // Gør session unauthorized
        return "You have been logged out.";
    }

    @GetMapping("/userList")
    public ResponseEntity<List<User>> getAllUsers(HttpSession session) {

        if (AppConfig.isAdmin(session)) {
            List<User> userList = userService.findAllUsers();
            return new ResponseEntity<>(userList, HttpStatus.OK);

        } else return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
    }

    @GetMapping("/isAdmin")
    public ResponseEntity<Boolean> isAdmin(HttpSession session) {
        boolean isAdmin = AppConfig.isAdmin(session);
        return ResponseEntity.ok(isAdmin);  // Return 200 OK med boolean value
    }

    // Create
    @PostMapping("/create")
    public ResponseEntity<?> createUser(@RequestBody User user) {
        try {
            User newUser = userService.createUser(user.getUsername(), user.getPassword());
            return ResponseEntity.ok(newUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating user: " + e.getMessage());
        }
    }

    // Delete
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        try {
            boolean isDeleted = userService.deleteUser(id);
            if (isDeleted) {
                return ResponseEntity.ok().body("User successfully deleted");
            } else {
                return ResponseEntity.badRequest().body("User not found");
            }
        } catch (IllegalArgumentException | EntityNotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Internal Server Error");
        }
    }






}
