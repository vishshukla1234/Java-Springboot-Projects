package com.BankingSystem.BankingManagementSystem.Controller;

import com.BankingSystem.BankingManagementSystem.Entity.Account;
import com.BankingSystem.BankingManagementSystem.Service.AccountService;
import com.BankingSystem.BankingManagementSystem.dto.AccountResponse;
import com.BankingSystem.BankingManagementSystem.dto.CreateAccountRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/accounts")
@RequiredArgsConstructor
public class AccountController {

    private final AccountService accountService;

    // Account is opened for the currently authenticated user - userId is never taken from the request body
    @PostMapping
    public ResponseEntity<AccountResponse> createAccount(@RequestBody CreateAccountRequest request,
                                                           Authentication authentication) {
        Account account = accountService.createAccount(request, authentication.getName());
        return ResponseEntity.ok(new AccountResponse(account));
    }

    // Owner of the account, or an admin, can view it. Anyone else gets 403.
    @GetMapping("/{id}")
    public ResponseEntity<AccountResponse> getAccount(@PathVariable Long id, Authentication authentication) {
        Account account = accountService.getAccountById(id);

        boolean isOwner = account.getUser().getEmail().equals(authentication.getName());
        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

        if (!isOwner && !isAdmin) {
            throw new AccessDeniedException("You do not have access to this account");
        }

        return ResponseEntity.ok(new AccountResponse(account));
    }

    @GetMapping("/my")
    public ResponseEntity<List<AccountResponse>> getMyAccounts(Authentication authentication) {
        List<AccountResponse> accounts = accountService.getAccountsForUser(authentication.getName())
                .stream().map(AccountResponse::new).toList();
        return ResponseEntity.ok(accounts);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<List<AccountResponse>> getAllAccounts() {
        List<AccountResponse> accounts = accountService.getAllAccounts()
                .stream().map(AccountResponse::new).toList();
        return ResponseEntity.ok(accounts);
    }
}
