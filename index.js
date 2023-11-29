const storeToBucket = require('./functions/storeToBucket');
const sendMail = require('./functions/mailUser');
const storeToDynamo = require('./functions/storeToDynamo');

exports.handler = async (event) => {
  let response = null;
  
  try {    
  
    //get data from event
    const message = JSON.parse(event.Records[0].Sns.Message);
    const {email, submission_url, assignment_id, account_id} = message;
  
    //store to bucket
    const status = await storeToBucket(submission_url, assignment_id, account_id);
  
    //send mail
    await sendMail(email, status);

    //send data to dynamodb
    await storeToDynamo(email, status === 'success' ? 'success' : 'failed');
  
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
