const { Storage } = require('@google-cloud/storage');
const fetch = require('node-fetch');
const decodeKey = require('../utils/decode-key');

//Download and store to gcp bucket
const storeToBucket = async (submission_url, assignment_id) => {
    let res = null;
    try {
        //download file
        const asset = await fetch(submission_url);
        const data = asset.buffer();
    
        //configure storage
        const storage = new Storage({
            projectId: process.env.projectId,
            credentials: decodeKey(),
        });

        //store to bucket
        await storage.bucket(process.env.gcpBucketName).file(`${assignment_id}/assignment-submission-${new Date().toString()}.zip`).save(data);
        res = 'success';
    } catch (e) {
        console.log(e);
        res = 'failure';
    }

    return res;
};


module.exports = storeToBucket;