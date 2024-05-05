package io.consumption.media.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Users")
public class Customers {
    @Id 
    @GeneratedValue
    @Column(name = "userName")
    private String userName;
    public String getUname() {
        return userName;
    }    
    public void setUname(String userName) {
        this.userName = userName;
    }  
    @Column(name = "password")
    private String password;
    public String getPword() {
        return password;
    }    
    public void setPword(String password) {
        this.password = password;
    }  
    @Column(name = "email")
    private String email;
    public String getEmail() {
        return email;
    }    
    public void setEmail(String email) {
        this.email = email;
    }  
    public Customers() {}
    public Customers(String userName, String email, String password) {
		this.userName = userName;
		this.email = email;
		this.password = password;
	}   
    // standard getters and setters
}