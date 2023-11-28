const storeToBucket = require('./functions/storeToBucket');
const sendMail = require('./functions/mailUser');
const storeToDynamo = require('./functions/storeToDynamo');

exports.handler = async (event) => {
  try {    
    let response = null;
  
    //get data from event
    const message = JSON.parse(event.Records[0].Sns.Message);
    const {email, submission_url, assignment_id} = message;
  
    //store to bucket
    let status = await storeToBucket(submission_url, assignment_id);
  
    //send mail
    status = await sendMail(email, status);
  
    //send data to dynamodb
    status = await storeToDynamo(email, status);

    response = {
      statusCode: 200,
      body: "success",
    };
  } catch(e) {
    console.log(JSON.stringify(e, null, 2));
    response = {
      statusCode: 500,
      body: JSON.stringify(e),
    }
  }
    return response;
};
