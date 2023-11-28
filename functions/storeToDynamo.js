const AWS = require('aws-sdk');

const storeToDynamo = async (email, status) => {
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    let res = null;

    try {
        //send data to dynamodb
        const params = {
            TableName: process.env.dynamodbTableName,
            Item: {
                id: Date.now().toString(),
                status,
                timestamp: Date.now().toString(),
                email,
            },
        };
            
        await dynamoDB.put(params).promise();
        res = 'success';
    } catch(e) {
        console.log(e);
        res = 'failure';
    }

    return res;
}

module.exports = storeToDynamo;