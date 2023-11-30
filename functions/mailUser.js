const formData = require('form-data');
const MailGun = require('mailgun.js');

const sendMail = async (to, status, signedUrl) => {
    let res = null;
    try {
        const mailgun = new MailGun(formData);
        const mg = mailgun.client({
        username: 'api',
        key: process.env.mailgunApiKey,
        });

        let text = `Your download status: ${status}`;
        text += signedUrl ? `\nPath to your file in your bucket: ${signedUrl}` : '';
    
        const mailData = {
            from: process.env.mailgunFrom,
            to,
            subject: 'Download Status',
            text,
        };
    
        //send mail
        res = await mg.messages.create(process.env.mailgunDomain, mailData);
    } catch (e) {
        console.log(e);
    }

    return res;
}

module.exports = sendMail;