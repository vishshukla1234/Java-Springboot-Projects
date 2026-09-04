package com.BankingSystem.BankingManagementSystem.dto;

import com.BankingSystem.BankingManagementSystem.Entity.Transaction;
import com.BankingSystem.BankingManagementSystem.Enum.TransactionStatus;
import com.BankingSystem.BankingManagementSystem.Enum.TransactionType;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class TransactionResponse {
    private final Long id;
    private final Long accountId;
    private final Long relatedAccountId;
    private final TransactionType type;
    private final TransactionStatus status;
    private final int amount;
    private final LocalDateTime timestamp;

    public TransactionResponse(Transaction transaction) {
        this.id = transaction.getId();
        this.accountId = transaction.getAccount().getId();
        this.relatedAccountId = transaction.getRelatedAccount() != null
                ? transaction.getRelatedAccount().getId() : null;
        this.type = transaction.getType();
        this.status = transaction.getStatus();
        this.amount = transaction.getAmount();
        this.timestamp = transaction.getTimestamp();
    }
}
