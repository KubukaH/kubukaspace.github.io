const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

const refreshToken = process.env.REACT_APP_REFRESH_TOKEN;
const clientId = process.env.REACT_APP_CLIENT_ID;
const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
const playgroundLink = process.env.REACT_APP_PLAYGROUND_LINK;
const emailFrom = process.env.REACT_APP_EMAIL_FROM;
const userEmail = process.env.REACT_APP_USER_EMAIL;

// Export our module to the Controllers
module.exports = sendEmail;

const oauth2Client = new OAuth2(
  clientId,
  clientSecret,
  playgroundLink
);

// Get and set the fresh Token
oauth2Client.setCredentials({
  refresh_token: refreshToken
});
const accessToken = oauth2Client.getAccessToken()

// Function to send Email
function sendEmail({ to, subject, html, from = emailFrom }) {
  const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: userEmail, 
      clientId: clientId,
      clientSecret: clientSecret,
      refreshToken: refreshToken,
      accessToken: accessToken
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  smtpTransport.sendMail({ from, to, subject, html });
}
