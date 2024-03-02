package io.consumption.media.controller;

import org.springframework.data.jpa.repository.JpaRepository; 

import io.consumption.media.model.Content;

public interface ContentRepository extends JpaRepository<Content, Long> {
}


