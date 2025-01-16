import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: 'anaspiko03@gmail.com',
    pass: 'eqid hqfd avxd lsol', // Replace this with your real password or use an environment variable
  },
});

// Email sending function
export const sendEmail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,  // Sender's email address
      to: to,                        // Receiver's email address
      subject: subject,
      html: text,                    // Use 'text' here, which is the HTML content passed into the function
    };
    

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
