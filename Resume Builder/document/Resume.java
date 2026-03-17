package com.vishal.resumebuilder.document;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "resume")
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Resume {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String userId;

    private String title;

    private String thumbnailLink;

    private Template template;

    @Embedded
    @Builder.Default
    private ProfileInfo profileInfo = new ProfileInfo();

    @Embedded
    @Builder.Default
    private ContactInfo contactInfo = new ContactInfo();

    @ElementCollection
    private List<WorkExperience> workExperiences;

    @ElementCollection
    private List<Education> educations;

    @ElementCollection
    private List<Skill> skills;

    @ElementCollection
    private List<Project> projects;

    @ElementCollection
    private List<Certification> certifications;

    @ElementCollection
    private List<Language> languages;

    @ElementCollection
    private List<String> interests;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    @Embeddable
    public static class Template {
        private String theme;
        private List<String> colorCodes;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    @Embeddable
    public static class ProfileInfo
    {
        private String profilePreviewUrl;
        private String fullName;
        private String designation;
        private String summary;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    @Embeddable
    public static class ContactInfo {
        private String email;
        private String phone;
        private String location;
        private String linedIn;
        private String github;
        private String website;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    @Embeddable
    public static class WorkExperience {
        private String company;
        private String role;
        private String endDate;
        private String description;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    @Embeddable
    public static class Education {
        private String degree;
        private String institution;
        private String startDate;
        private String endDate;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    @Embeddable
    public static class Skill {
        private String name;
        private String progress;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    @Embeddable
    public static class Project {
        private String title;
        private String description;
        private String github;
        private String liveDemo;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    @Embeddable
    public static class Certification {
        private String title;
        private String issuer;
        private String year;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    @Embeddable
    public static class Language {
        private String name;
        private Integer progress;
    }
}
