const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const path = require('node:path');
const fs = require('node:fs');

dotenv.config();

const removeTempFile = (filename) => {
  fs.unlink(filename, (err) => {
    if (err) throw err;
    console.log(`${filename} was deleted`);
  });
}

const httpMailer = async ({ body: { text, to, subject }, file }, res) => {
  try {
    const attachments = file && [{
      filename: file.filename,
      path: path.join(__dirname, '../', 'assets', file.filename),
      cid: `${file.filename}-${to}`
    }];
    const html = `
        <h1 style="text-align: center">${subject}</h1>
        <p>${text}</p>
    `;
    const mailConfig = {
      host: process.env.MAIL_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.YOUR_EMAIL,
        pass: process.env.PASSWORD
      },
      tls: {
        rejectUnauthorized: false
      }
    };
    const mailOptions = {
      from: process.env.YOUR_EMAIL,
      to: [to],
      subject,
      html,
      attachments: attachments
    };

    const transporter = nodemailer.createTransport(mailConfig);
    const info = await transporter.sendMail(mailOptions);
    const acceptedEmails = info.accepted.join(' ,');

    if (attachments) {
      removeTempFile(path.join(__dirname, '../', 'assets', file.filename));
    }

    return res.status(200).json({ message: `Messages to emails ${acceptedEmails} were sent successful` })
  } catch (error) {
    console.error(error);

    return res.status(500).json({error});
  }
}

module.exports = {
  httpMailer
}