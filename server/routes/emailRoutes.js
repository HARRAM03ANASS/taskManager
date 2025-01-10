// const express = require('express');
// const router = express.Router();
// const nodemailer = require('nodemailer');

// router.post('/send-email', async (req, res) => {
//   const { to, subject, text } = req.body;

//   if (!to || !subject || !text) {
//     return res.status(400).json({ 
//       error: 'Missing required fields' 
//     });
//   }

//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS
//     }
//   });

//   try {
//     await transporter.sendMail({
//       from: `"Système de Gestion des Tâches" <${process.env.EMAIL_USER}>`,
//       to,
//       subject,
//       text
//     });
    
//     res.status(200).json({ 
//       message: 'Email sent successfully' 
//     });
//   } catch (error) {
//     console.error('Email sending error:', error);
//     res.status(500).json({ 
//       error: 'Failed to send email',
//       details: error.message 
//     });
//   }
// });

// export default router;
