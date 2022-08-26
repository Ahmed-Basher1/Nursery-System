  require("dotenv").config();
  const nodemailer = require("nodemailer");
  async function sendEmail(email, code) {
  try {
    const smtpEndpoint = "smtp.ethereal.email";
    const port = 587;
    const senderAddress = "a7medbasher811@gmail.com";
    var toAddress = email;
    const smtpUsername = "gerald.ratke72@ethereal.email";
    const smtpPassword = process.env.SG_APIKEY;
    // The body of the email for recipients

    
    let transporter = nodemailer.createTransport({
      host: smtpEndpoint,
      port: port,
      secure: true, 
      auth: {
        user: smtpUsername,
        pass: smtpPassword,
      },
    });
    // Specify the fields in the email.
    let mailOptions = {
      from: senderAddress,
      to: toAddress,
      subject: subject,
    };
    let info = await transporter.sendMail(mailOptions);
    return { error: false };
  } catch (error) {
    console.error("send-email-error", error);
    return {
      error: true,
      message: "Cannot send email",
    };
  }
}
module.exports = { sendEmail };