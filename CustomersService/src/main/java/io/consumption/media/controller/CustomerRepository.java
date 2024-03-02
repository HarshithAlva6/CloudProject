package io.consumption.media.controller;

import org.springframework.data.jpa.repository.JpaRepository;

import io.consumption.media.model.Customers;

public interface CustomerRepository extends JpaRepository<Customers, Long> {
}
