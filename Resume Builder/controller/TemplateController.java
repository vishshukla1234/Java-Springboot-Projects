package com.vishal.resumebuilder.controller;

import com.vishal.resumebuilder.Service.TemplateService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/templates")
@Slf4j
public class TemplateController {

    private final TemplateService templateService;

    @GetMapping
    public ResponseEntity<?> getTemplates(Authentication authentication) {
        //Step 1: call the service method
        Map<String, Object> response = templateService.getTemplates(authentication.getPrincipal());

        //Step 2: return the response
        return ResponseEntity.ok(response);
    }
}
