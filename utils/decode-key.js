const decodeKey = () => {
    //decode private key
    const buffer = Buffer.from(process.env.gcpServiceAccountKey, 'base64').toString('utf-8');
    const serviceAccountKey = JSON.parse(buffer);

    return serviceAccountKey;
}

module.exports = decodeKey;