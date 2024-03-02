package io.consumption.media.model;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import io.consumption.media.controller.CustomerRepository;

@Component
public class CustomerData implements CommandLineRunner { 

	private final CustomerRepository repository;

	public CustomerData(CustomerRepository repository) {
		this.repository = repository;
	}

	@Override
	public void run(String... strings) throws Exception { 
		this.repository.save(new Customers("Harshith", "Alva", "harshalva.titan@csu.fullerton.edu"));
		this.repository.save(new Customers("Ram", "Aditya", "ram.aditya@gmail.com"));
	 }
}