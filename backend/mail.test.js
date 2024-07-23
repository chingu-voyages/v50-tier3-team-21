require("dotenv").config();

const { sendEmail } = require('./middlewares/mail');

const address = "tomdu3@ymail.com";
const link = "https://example.com/reset-password";

sendEmail(address, link);