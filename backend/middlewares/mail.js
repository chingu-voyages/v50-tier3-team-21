const nodemailer = require("nodemailer");

// TODO: rewrite the function to include subject and html as parameters
async function mailService(emailAddress, subject, html) {
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
    subject: subject, // Subject line  // TODO: subject parameter
    text: "The link will expire in 15 minutes.", // plain text body
    html: html, // html parameter
  });

  console.log("Message sent: %s", info.messageId);
}
// TODO: add parameters subject and html, 
async function sendEmail(address, subject, html) {
  
  try {
    // TODO: add subject and html as parameters
    await mailService(address, subject, html);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

module.exports = { sendEmail };
