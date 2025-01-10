import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", // Or another email service
  auth: {
    user: process.env.EMAIL_USER,  // Add your email here
    pass: process.env.EMAIL_PASS,  // Add your email password here
  },
});

export const sendEmail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,  // Sender's email address
      to: to,                       // Receiver's email address
      subject: subject,
      text: text,                   // Message content
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
