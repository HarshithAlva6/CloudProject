package io.consumption.media.model;


import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import io.consumption.media.controller.ContentRepository;

@Component
public class ContentData implements CommandLineRunner{
    private final ContentRepository repository;

	public ContentData(ContentRepository repository) { 
		this.repository = repository;
	}

	@Override
	public void run(String... strings) throws Exception { 
		this.repository.save(new Content("Harshith Alva", "The primary owner", "https://cdni.iconscout.com/illustration/premium/thumb/male-web-developer-doing-research-on-development-5691622-4759504.png"));
		this.repository.save(new Content("Ram Aditya", "The owner's friend", "https://cdni.iconscout.com/illustration/premium/thumb/web-developer-working-on-project-4550335-3779143.png"));
	 }
}


