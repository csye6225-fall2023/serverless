const AWS = require('aws-sdk');

const storeToDynamo = async (email, status) => {
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
  
    try {
        //send data to dynamodb
        const params = {
            TableName: process.env.dynamodbTableName,
            Item: {
                id: Date.now().toString(),
                status,
                timestamp: new Date().toISOString(),
                email,
            },
        };
            
        await dynamoDB.put(params).promise();
    } catch(e) {
        console.log(e);
    }
}

module.exports = storeToDynamo;