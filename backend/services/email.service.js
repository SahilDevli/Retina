import nodemailer from "nodemailer";

export const sendOtpEmail = async (to, otp) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: `"OTP Service" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your OTP Code",
    html: `
      <h2>Your OTP</h2>
      <p><b>${otp}</b></p>
      <p>Expires in 5 minutes</p>
    `
  });
};
