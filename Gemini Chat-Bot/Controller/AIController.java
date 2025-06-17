package com.ai.Gemini_Chat.Controller;

import com.ai.Gemini_Chat.Service.QnAService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/api/qna")
public class AIController {

    private final QnAService qnAService;

    public AIController(QnAService qnAService) {
        this.qnAService = qnAService;
    }

    @PostMapping("/ask")
    public ResponseEntity<String> askQuestions(@RequestBody Map<String, String> payload) {
        String question = payload.get("question");
        String answer = qnAService.getAnswer(question);
        return ResponseEntity.ok(answer);
    }
}
