const formData = require('form-data');
const MailGun = require('mailgun.js');

const sendMail = async (to, status, signedUrl) => {
    try {
        const mailgun = new MailGun(formData);
        const mg = mailgun.client({
        username: 'api',
        key: process.env.mailgunApiKey,
        });

        let text = `Your download status:\n ${status}`;
        text += signedUrl ? `\nDownload link: ${signedUrl}` : '';
    
        const mailData = {
            from: process.env.mailgunFrom,
            to,
            subject: 'Download Status',
            text,
        };
    
        //send mail
        await mg.messages.create(process.env.mailgunDomain, mailData);
    } catch (e) {
        console.log(e);
    }
}

module.exports = sendMail;