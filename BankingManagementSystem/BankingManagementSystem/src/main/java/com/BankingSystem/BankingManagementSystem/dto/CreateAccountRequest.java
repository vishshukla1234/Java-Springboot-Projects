package com.BankingSystem.BankingManagementSystem.dto;

import com.BankingSystem.BankingManagementSystem.Enum.AccountType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Note: no userId here on purpose. The account owner is taken from the
 * authenticated principal (the JWT), not from client input - otherwise
 * any logged-in user could open an account under someone else's id.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateAccountRequest {
    private AccountType accountType;
}
