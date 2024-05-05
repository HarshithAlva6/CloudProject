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
public class CustomerData {

    private final AmazonDynamoDB dynamoDBClient;

    public CustomerData () {
        String accessKeyId = "AKIAQ3EGQDES2GIZWRCX";
        String secretAccessKey = "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";

        BasicAWSCredentials awsCredentials = new BasicAWSCredentials(accessKeyId, secretAccessKey);
        this.dynamoDBClient = AmazonDynamoDBClientBuilder.standard()
                .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                .withRegion("us-west-1") // Replace with your desired region
                .build();
    }

    public List<Customers> fetchData(String tableName) {
        ScanRequest scanRequest = new ScanRequest().withTableName(tableName);

        ScanResult response = dynamoDBClient.scan(scanRequest);

        List<Customers> customers = new ArrayList<>();
        for (Map<String, AttributeValue> item : response.getItems()) {
            // Map each item to a Content object
            Customers customer = mapToContent(item);
            customers.add(customer);
        }
        return customers;
    }

    private Customers mapToContent(Map<String, AttributeValue> item) {
        // Create a new Content object and set its properties based on the item attributes
        Customers content = new Customers();
        content.setUname(item.get("userName").getS());
        content.setPword(item.get("password").getS());
        content.setEmail(item.get("noCount").getS());
        // Set other properties as needed
        return content;
    }
}
