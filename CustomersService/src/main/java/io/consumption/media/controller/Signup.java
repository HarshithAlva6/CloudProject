package io.consumption.media.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.consumption.media.model.Customers;
import io.consumption.media.model.CustomerData;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/signup")
public class Signup {

    private final CustomerData customerData;

    public Signup(CustomerData customerData) {
        this.customerData = customerData;
    }
    @GetMapping
    public List<Customers> fetchData() {
        return customerData.fetchData("Users");
    }
}
