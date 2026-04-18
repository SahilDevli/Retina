import dotenv from "dotenv";
dotenv.config({ path: ".env" });

import express from "express";
import cors from "cors";
import { sendOtpEmail } from "./services/email.service.js";



const app = express();
const PORT = process.env.PORT;

// in-memory OTP store
const otpStore = new Map();

app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("Backend is working");
});

// generate OTP
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// send OTP
app.post("/send-otp", async (req, res) => {
  try {
    const { contact } = req.body;

    if (!contact) {
      return res.status(400).json({
        success: false,
        message: "Email is required"
      });
    }

    const otp = generateOtp();

    // store OTP before sending email
    otpStore.set(contact, {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000
    });

    await sendOtpEmail(contact, otp);

    return res.status(200).json({
      success: true,
      message: "OTP sent to your email"
    });

  } catch (error) {
    console.error("Error in /send-otp:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send OTP"
    });
  }
});

// verify OTP
app.post("/verify-otp", (req, res) => {
  try {
    const { contact, otp } = req.body;

    if (!contact || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required"
      });
    }

    const record = otpStore.get(contact);

    if (!record) {
      return res.status(400).json({
        success: false,
        message: "No OTP found for this email"
      });
    }

    if (Date.now() > record.expiresAt) {
      otpStore.delete(contact);
      return res.status(400).json({
        success: false,
        message: "OTP expired"
      });
    }

    if (record.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP"
      });
    }

    otpStore.delete(contact);

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully"
    });

  } catch (error) {
    console.error("Error in /verify-otp:", error);

    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running at: http://localhost:${PORT}`);
});