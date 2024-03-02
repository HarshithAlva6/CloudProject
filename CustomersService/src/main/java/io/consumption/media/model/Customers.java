package io.consumption.media.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "customer")
public class Customers {
    @Id 
    @GeneratedValue
    @Column(name = "id")
    private long id;
    private String firstName;
    private String lastName;
    private String password;
    private String matchingPassword;
    private String email;

    public Customers() {}
    public Customers(String firstName, String lastName, String email) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
	} 
    public long getId() {
        return id;
    }
    public String getFname() {
        return firstName;
    }    
    public void setFname(String firstName) {
        this.firstName = firstName;
    }    
    public String getLname() {
        return lastName;
    }    
    public void setLname(String lastName) {
        this.lastName = lastName;
    }  
    public String getPword() {
        return password;
    }    
    public void setPword(String password) {
        if(this.password == this.matchingPassword)
            this.password = matchingPassword;
    }  
    public String getEmail() {
        return email;
    }    
    public void setEmail(String email) {
        this.email = email;
    }  
    // standard getters and setters
}