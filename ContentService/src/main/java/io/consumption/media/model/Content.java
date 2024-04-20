package io.consumption.media.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Images")
public class Content {
    @Id 
    @GeneratedValue
    @Column(name = "imageId")
    private Number imageId;
    public Number getImageId() {
        return imageId;
    }
    public void setImageId(Number imageId) {
        this.imageId = imageId;
    }
    @Column(name = "display")
    private boolean display;
    public boolean isDisplay() {
        return display;
    }
    public void setDisplay(boolean display) {
        this.display = display;
    }
    @Column(name = "imageName")
    private String imageName;
    public String getImageName() {
        return imageName;
    }
    public void setImageName(String imageName) {
        this.imageName = imageName;
    }
    @Column(name = "noCount")
    private Number noCount;

    public Number getNoCount() {
        return noCount;
    }
    public void setNoCount(Number noCount) {
        this.noCount = noCount;
    }
    public Content() {}
    public Content(Number imageId, boolean display, String imageName, Number noCount) {
		this.imageId = imageId;
		this.display = display;
        this.imageName = imageName;
        this.noCount = noCount;
	} 
}
