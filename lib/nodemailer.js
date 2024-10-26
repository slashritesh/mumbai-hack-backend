import nodemailer from "nodemailer"


// Set up email
export const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 587,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});
  
  // Make email template for magic link
export const emailTemplate = ({ username, link }) => `
    <h2>Hey ${username}</h2>
    <p>Here's the login link you just requested:</p>
    <p>${link}</p>
  `
