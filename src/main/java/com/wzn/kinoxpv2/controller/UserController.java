package com.wzn.kinoxpv2.controller;

import com.wzn.kinoxpv2.entity.User;
import com.wzn.kinoxpv2.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;
    public UserController(UserService userService) {
        this.userService = userService;
    }

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

}
