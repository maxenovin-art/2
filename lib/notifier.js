import nodemailer from 'nodemailer';
// Twilio is optional; use environment variables to enable real SMS
import Twilio from 'twilio';
export async function sendEmail(to, subject, text){
  // For demo we log. For real usage configure transporter with SMTP or SendGrid.
  console.log('[email] to',to,subject,text);
  // Example using nodemailer (uncomment and configure .env in production)
  // const transporter = nodemailer.createTransport({/* smtp config */});
  // await transporter.sendMail({from:process.env.EMAIL_FROM, to, subject, text});
}
export async function sendSMS(to, body){
  console.log('[sms] to',to, body);
  // const client = Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  // await client.messages.create({from: process.env.TWILIO_FROM_NUMBER, to, body});
}
