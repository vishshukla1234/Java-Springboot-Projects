package com.BankingSystem.BankingManagementSystem.Entity;

import com.BankingSystem.BankingManagementSystem.Enum.TransactionStatus;
import com.BankingSystem.BankingManagementSystem.Enum.TransactionType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "transactions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "account_id")
    private Account account;

    // Only populated for TRANSFER transactions (the other side of the transfer)
    @ManyToOne
    @JoinColumn(name = "related_account_id")
    private Account relatedAccount;

    @Enumerated(EnumType.STRING)
    private TransactionType type;

    @Enumerated(EnumType.STRING)
    private TransactionStatus status;

    private int amount;

    private LocalDateTime timestamp;
}
