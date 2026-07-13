package com.url.shortner.repository;

import com.url.shortner.models.ClickEvent;
import com.url.shortner.models.UrlMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ClickEventRepositiory extends JpaRepository<ClickEvent, Long> {
    List<ClickEvent> findByUrlMappingAndClickedDateBetween(UrlMapping mapping, LocalDateTime startDate, LocalDateTime endDate);
    List<ClickEvent> findByUrlMappingInAndClickedDateBetween(List<UrlMapping> urlMappings, LocalDateTime startDate, LocalDateTime endDate);

}
