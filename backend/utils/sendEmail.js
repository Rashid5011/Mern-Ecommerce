const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
  console.log("sendEmail function called");
  const transporter = nodeMailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    service: process.env.SMPT_SERVICE,
    auth: {
      user: "risshi2323@gmail.com",
      pass: "wijt bcpm zvom geri",
    },
  });

  const mailOptions = {
    from: "risshi2323@gmail.com",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Email sending error:", error);
    throw error;
  }
};

module.exports = sendEmail;
