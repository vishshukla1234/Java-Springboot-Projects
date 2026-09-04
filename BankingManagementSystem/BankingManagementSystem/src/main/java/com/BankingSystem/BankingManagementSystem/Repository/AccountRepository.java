package com.BankingSystem.BankingManagementSystem.Repository;

import com.BankingSystem.BankingManagementSystem.Entity.Account;
import com.BankingSystem.BankingManagementSystem.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AccountRepository extends JpaRepository<Account, Long> {
    boolean existsByAccountNumber(Long accountNumber);
    List<Account> findByUser(User user);
    List<Account> findByUserId(Long userId);
}
