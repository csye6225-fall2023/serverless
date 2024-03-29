const { Storage } = require('@google-cloud/storage');
const fetch = require('node-fetch');
const decodeKey = require('../utils/decode-key');

//Download and store to gcp bucket
const storeToBucket = async (submission_url, assignment_id, account_id) => {
    let res = null;
    let signedUrl = null;
    try {
        //download file
        const asset = await fetch(submission_url);

        if(asset.ok) {
            const data = asset.buffer();
        
            //configure storage
            const storage = new Storage({
                projectId: process.env.projectId,
                credentials: decodeKey(),
            });

            //store to bucket
            const file = `${account_id}/${assignment_id}/assignment-submission-${new Date().toString()}.zip`
            await storage.bucket(process.env.gcpBucketName).file(file).save(data);
            
            signedUrl = file;
   
            res = 'success';
        } else {
            res = "Upload to bucket failed, Reason: Didn't get a valid response from the url";
        }
    } catch (e) {
        console.log(e);
        res = 'Upload to bucket failed, Reason: The specified domain name does not exist';
    }

    return {
        res,
        signedUrl,
    };
};


module.exports = storeToBucket;