package com.vishal.resumebuilder.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.client.ResourceAccessException;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidationException(MethodArgumentNotValidException exception) {
        log.info("Inside GlobalExceptionHandler - handleValidationException()");
        Map<String, String> errors = new HashMap<>();
        exception.getBindingResult().getAllErrors().forEach(error->{
            String feildName = ((FieldError)error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(feildName,errorMessage);
        });

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Validation failed");
        response.put("errors", errors);

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }

    @ExceptionHandler(ResourceAccessException.class)
    public ResponseEntity<Map<String, Object>> handleResourceExistsException (ResourceExistsException ex) {
        log.info("Inside GlobalExceptionHandler - handleResourceExistsException()");
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Resource exists");
        response.put("error", ex.getMessage());

        return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleGenericException(Exception ex) {
        log.info("Inside GlobalExceptionHandler - handleGenericException()");
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Something went wrong! Contact administrator.");
        response.put("error", ex.getMessage());

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);

    }
}
