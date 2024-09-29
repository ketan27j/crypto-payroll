import nodemailer from 'nodemailer';

export async function sendNotification(to: string, from: string, subject: string, body: string, buttonUrl: string) {
    console.log(`Sending email from: ${process.env.GMAIL_USER}, to: ${to}`);
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD // Use an app password for better security
      }
    });
    // Set up email data
    let mailOptions = {
      from: process.env.GMAIL_USER, // Sender address
      to: to, // List of recipients
      subject: subject, // Subject line
      //text: body, // Plain text body
      html: body // HTML body
    };
  
    // Send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
    });
  };