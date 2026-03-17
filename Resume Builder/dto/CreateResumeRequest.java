package com.vishal.resumebuilder.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateResumeRequest {

    @NotBlank(message = "Title is required")
    private String title;

}
