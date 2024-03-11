package io.consumption.media;

import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.RestController;

import com.amazonaws.services.s3.model.AmazonS3Exception;

import io.consumption.media.model.S3Service;
import lombok.extern.log4j.Log4j2;

@SpringBootApplication
@RestController
@Log4j2
@ComponentScan({"io.consumption.media"})
public class S3ServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(S3ServiceApplication.class, args);
	}
	@Bean
    public ApplicationRunner applicationRunner(S3Service s3Service){
        return args -> {
            log.info("Spring Boot AWS S3 integration...");

            try {
                var s3Object = s3Service.getFile("cat.jpg");
                log.info(s3Object.getKey());
            } catch (AmazonS3Exception e) {
                log.error(e.getMessage());
            }
        };
    }
}
