import express from 'express';
import cors from 'cors';
import { sendOtpEmail } from "./services/email.service.js";
import dotenv from "dotenv";
dotenv.config();


const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send("Hello backend");
});


const generateOtp = () =>{
  Math.floor(100000 + Math.random() * 900000).toString();
}

app.post('/send-otp', async (req, res) => {
  try {
    const { contact } = req.body;

    if (!contact) {
      return res.status(400).json({ message: "Email is required" });
    }

    const otp = generateOtp();

    // SEND EMAIL
    await sendOtpEmail(contact, otp);

    res.status(200).json({
      message: "OTP sent to your email"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to send OTP"
    });
  }
});


app.listen(PORT, () => {
  console.log(`Backend is running at: http://localhost:${PORT}`);
});