package com.wzn.kinoxpv2.config;

import jakarta.servlet.http.HttpSession;

public class AppConfig {
    public static boolean isAdmin(HttpSession session) {
        // Extract the role from the session
        String userRole = (String) session.getAttribute("role");

        // Check if the user is an admin
        return userRole != null && userRole.equals("ADMIN");
    }
}
