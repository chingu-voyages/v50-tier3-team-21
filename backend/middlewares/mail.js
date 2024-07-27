const nodemailer = require("nodemailer");

// TODO: rewrite the function to include subject and html parameters
async function mailService(emailAddress, link) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Hungry Hippo Support" <support@hungryhippo.mail>', // sender address
    to: emailAddress,
    subject: "Password Reset", // Subject line  // TODO: subject parameter
    text: "The link will expire in 15 minutes.", // plain text body
    html: `The link will expire in 15 minutes.<br/><a href="${link}">Click here</a> to reset your password.`, // html parameter
  });

  console.log("Message sent: %s", info.messageId);
}

async function sendEmail(address, link) {
  try {
    await mailService(address, link);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

module.exports = { sendEmail };
