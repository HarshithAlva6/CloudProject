var AWS = require('aws-sdk');

var docClient = new AWS.DynamoDB.DocumentClient({ 
    region: 'us-west-1',
    signatureVersion: 's3v4',
    accessKeyId: 'AKIAQ3EGQDES2GIZWRCX',
    secretAccessKey: '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'
 });
export const fetchData = (tableName, callback) => {
    var params = {
        TableName: tableName
    }
    docClient.scan(params, function (err, data) {
        if (!err) {
            callback(null, data.Items);
        }
    })
}
export const putData = async (tableName , data) => {
    var params = {
        TableName: tableName,
        Item: data
    }  
    await docClient.put(params, function (err, data) {
        if (err) {
            console.log('Error', data, err);
        } else {
            console.log('Success', data);
        }
    }).promise();
}