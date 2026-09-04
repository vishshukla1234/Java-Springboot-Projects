package com.BankingSystem.BankingManagementSystem.Service;

import com.BankingSystem.BankingManagementSystem.Entity.Account;
import com.BankingSystem.BankingManagementSystem.Entity.User;
import com.BankingSystem.BankingManagementSystem.Exception.ResourceNotFoundException;
import com.BankingSystem.BankingManagementSystem.Repository.AccountRepository;
import com.BankingSystem.BankingManagementSystem.Repository.UserRepository;
import com.BankingSystem.BankingManagementSystem.dto.CreateAccountRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;
    private final UserRepository userRepository;

    public Account createAccount(CreateAccountRequest request, String ownerEmail) {
        User owner = userRepository.findByEmail(ownerEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Account account = new Account();
        account.setUser(owner);
        account.setAccountType(request.getAccountType());
        account.setBalance(0);
        account.setStatus("ACTIVE");
        account.setAccountNumber(generateAccountNumber());
        account.setCreatedAt(LocalDateTime.now());

        return accountRepository.save(account);
    }

    public Account getAccountById(Long id) {
        return accountRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Account not found with id: " + id));
    }

    public List<Account> getAccountsForUser(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return accountRepository.findByUser(user);
    }

    public List<Account> getAllAccounts() {
        return accountRepository.findAll();
    }

    private Long generateAccountNumber() {
        Random random = new Random();
        Long accountNumber;
        do {
            accountNumber = 1000000000L + (long) (random.nextDouble() * 9000000000L);
        } while (accountRepository.existsByAccountNumber(accountNumber));
        return accountNumber;
    }
}
