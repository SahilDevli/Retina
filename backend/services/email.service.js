import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    // user: process.env.GMAIL_USER,
    // pass: process.env.GMAIL_PASS
    user: "web99servicesformail@gmail.com",
    pass: "pdgz czax jeqa jbzf"
  }
});

export const sendOtpEmail = async (to, otp) => {
  try {
    const info = await transporter.sendMail({
      from: `"OTP Service" < web99servicesformail@gmail.com >`,
      to,
      subject: "Your OTP Code",
      html: `
        <div style="font-family: Arial; text-align:center;">
          <h2>OTP Verification</h2>
          <p>Your OTP is:</p>
          <h1 style="letter-spacing: 5px;">${otp}</h1>
          <p>This OTP expires in 5 minutes</p>
        </div>
      `
    });

    return info;

  } catch (error) {
    console.error("Email failed:", error);
    throw new Error("Email sending failed");
  }
};