package io.consumption.media.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.consumption.media.model.Content;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/watchlist")
public class WatchList {

    private final ContentRepository contentRepository;

    public WatchList(ContentRepository contentRepository) {
        this.contentRepository = contentRepository;
    }
    @GetMapping
    public List<Content> getContent() {
        return (List<Content>) contentRepository.findAll();
    }
}
