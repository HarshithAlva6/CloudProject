package io.consumption.media.controller;

import java.util.List;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.consumption.media.model.Content;
import io.consumption.media.model.DynamoDBService;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/watchlist")
public class DynamoDBController {

    private final DynamoDBService dynamoDBService;

    public DynamoDBController(DynamoDBService dynamoDBService) {
        this.dynamoDBService = dynamoDBService;
    }
    
    @GetMapping
    public List<Content> fetchData() {
        return dynamoDBService.fetchData("Images");
    }
}

