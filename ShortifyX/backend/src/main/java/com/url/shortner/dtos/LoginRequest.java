package com.url.shortner.dtos;

import lombok.Data;

@Data
public class LoginRequest {
    private String username;
    private String password;
}
