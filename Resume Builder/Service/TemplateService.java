package com.vishal.resumebuilder.Service;

import com.vishal.resumebuilder.dto.AuthResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;

import static com.vishal.resumebuilder.utils.AppConstants.PREMIUM;

@Service
@RequiredArgsConstructor
@Slf4j
public class TemplateService {

    private final AuthService authService;

    public Map<String, Object> getTemplates(Object principal) {
        //Step 1: get the current profile
        AuthResponse authResponse = authService.getProfile(principal);

        //Step 2: get the available templates based on subscription plan
        List<String> availableTemplates;

        Boolean isPremium = PREMIUM.equalsIgnoreCase(authResponse.getSubscriptionPlan());
        if (isPremium) {
            availableTemplates = List.of("01", "02", "03");
        } else {
            availableTemplates = List.of("01");
        }

        //Step 3: add the data in the map
        Map<String, Object> restrictions = new HashMap<>();
        restrictions.put("availableTemplates", availableTemplates);
        restrictions.put("allTemplates", List.of("01", "02", "03"));
        restrictions.put("subscriptionPlan", authResponse.getSubscriptionPlan());
        restrictions.put("isPremium", isPremium);

        //Step 4: return the result
        return restrictions;
    }
}
