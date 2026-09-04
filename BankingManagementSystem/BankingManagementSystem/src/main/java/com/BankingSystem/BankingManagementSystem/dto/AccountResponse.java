package com.BankingSystem.BankingManagementSystem.dto;

import com.BankingSystem.BankingManagementSystem.Entity.Account;
import com.BankingSystem.BankingManagementSystem.Enum.AccountType;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class AccountResponse {
    private final Long id;
    private final Long accountNumber;
    private final AccountType accountType;
    private final int balance;
    private final String status;
    private final Long userId;
    private final String userName;
    private final LocalDateTime createdAt;

    public AccountResponse(Account account) {
        this.id = account.getId();
        this.accountNumber = account.getAccountNumber();
        this.accountType = account.getAccountType();
        this.balance = account.getBalance();
        this.status = account.getStatus();
        this.userId = account.getUser().getId();
        this.userName = account.getUser().getName();
        this.createdAt = account.getCreatedAt();
    }
}
