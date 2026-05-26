const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_APP_PASS,
  },
});

let sentMailTo = async (to, subject, html) => {
  let option = {
    from: process.env.SMTP_USER,
    to,
    subject,
    html,
  };
  return await transporter.sendMail(option);
};

module.exports = sentMailTo;
