package com.url.shortner.models;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
public class UrlMapping {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 2048)
    private String originalUrl;

    private String shortUrl;
    private int clickCount = 0;
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "user_id")  //specifies the foreign key linking of the user
    private User user;

    @OneToMany(mappedBy = "urlMapping")
    private List<ClickEvent> clickedEvents;
}
