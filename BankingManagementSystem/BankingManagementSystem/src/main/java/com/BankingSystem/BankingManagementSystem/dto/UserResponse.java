package com.BankingSystem.BankingManagementSystem.dto;

import com.BankingSystem.BankingManagementSystem.Entity.User;
import com.BankingSystem.BankingManagementSystem.Enum.Role;
import lombok.Getter;

@Getter
public class UserResponse {
    private final Long id;
    private final String name;
    private final String email;
    private final Role role;

    public UserResponse(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.email = user.getEmail();
        this.role = user.getRole();
    }
}
