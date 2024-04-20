package io.consumption.media.model;

import org.springframework.stereotype.Service;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDBClientBuilder;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.dynamodbv2.model.ScanRequest;
import com.amazonaws.services.dynamodbv2.model.ScanResult;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class DynamoDBService {

    private final AmazonDynamoDB dynamoDBClient;

    public DynamoDBService () {
        String accessKeyId = "AKIAQ3EGQDES2GIZWRCX";
        String secretAccessKey = "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";

        BasicAWSCredentials awsCredentials = new BasicAWSCredentials(accessKeyId, secretAccessKey);
        this.dynamoDBClient = AmazonDynamoDBClientBuilder.standard()
                .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                .withRegion("us-west-1") // Replace with your desired region
                .build();
    }

    public List<Content> fetchData(String tableName) {
        ScanRequest scanRequest = new ScanRequest().withTableName(tableName);

        ScanResult response = dynamoDBClient.scan(scanRequest);

        List<Content> contents = new ArrayList<>();
        for (Map<String, AttributeValue> item : response.getItems()) {
            // Map each item to a Content object
            Content content = mapToContent(item);
            contents.add(content);
        }
        return contents;
    }

    private Content mapToContent(Map<String, AttributeValue> item) {
        // Create a new Content object and set its properties based on the item attributes
        Content content = new Content();
        content.setImageId(Integer.parseInt(item.get("imageId").getN()));
        content.setImageName(item.get("imageName").getS());
        content.setNoCount(Integer.parseInt(item.get("noCount").getN()));
        // Set other properties as needed
        return content;
    }
}
