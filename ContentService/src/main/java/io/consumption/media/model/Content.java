package io.consumption.media.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "content")
public class Content {
    @Id 
    @GeneratedValue
    @Column(name = "id")
    private long id;
    private String userName;
    private String caption;
    private String imageLink;

    public Content() {}
    public Content(String userName, String caption, String imageLink) {
		this.userName = userName;
		this.caption = caption;
        this.imageLink = imageLink;
	} 
    public long getId() {
        return id;
    }
    public String getUname() {
        return userName;
    }    
    public void setUname(String userName) {
        this.userName = userName;
    }    
    public String getCap() {
        return caption;
    }    
    public void setLname(String caption) {
        this.caption = caption;
    }  
    public String getLink() {
        return imageLink;
    }    
    public void setLink(String imageLink) {
        this.imageLink = imageLink;
    }  
    // standard getters and setters
}
