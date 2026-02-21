import React, { useState } from 'react'
import '../styles/LoginIntro.css'
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"

import api from "../api/axios";

import Docter from './Docter.webp';

export default function LoginIntro(){

    const [showOtp, setShowOtp] = useState(false);
    const [contact, setContact] = useState('');
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");

    const navigate = useNavigate();

    // -------------------------
    // --- SEND OTP FUNCTION ---
    // -------------------------
    const sendOtp = async () => {
      setErr("");
    
      if (!contact.trim()) {
        setErr("Please enter email or phone number.");
        return;
      }
    
      setLoading(true);
    
      try {
        const { data } = await api.post("/send-otp", { contact });
    
        setShowOtp(true);
    
      } catch (error) {
        if (error.response) {
          // Backend responded with error
          setErr(error.response.data.message || "Failed to send OTP");
        } else {
          // Network / server down
          setErr("Server not responding");
        }
      } finally {
        setLoading(false);
      }
    };
    


    return (
        <section className="login-intro">
            <div className="login-inner container">

                <img src={Docter} alt='abc' className='docSab' title='Greetings, I am Retina'/>

                <motion.div className="intro-left"
                    initial={{ opacity: 1, x: 0 }}
                    whileInView={{ opacity: 1, x: 1 }}
                    transition={{ duration: 0.5 }}>

                    <h1 className="mv-title">Retina</h1>
                    <p className="mv-sub">An Integrated Deep Learning System for <span>Comprehensive Ocular Disease</span>.</p>

                    <div className="login-card">

                        <label className="label">Email or Indian phone number</label>

                        <input
                            value={contact}
                            onChange={e => setContact(e.target.value)}
                            className="input"
                            placeholder="example@mail.com or 9123456789"
                        />

                        {/* ERROR MESSAGE */}
                        {err && <p className="error-text">{err}</p>}

                        {/* SEND OTP */}
                        {!showOtp ? (
                            <button className="btn-primary" onClick={sendOtp} disabled={loading}>
                                {loading ? "Sending..." : "Send OTP"}
                            </button>
                        ) : (
                            <div className="otp-row">
                                <input className="otp-input" placeholder="Enter OTP" />
                                <button className="btn-primary small">Next ›</button>
                            </div>
                        )}

                        <div className="login-hint">We accept emails and Indian numbers (+91 format). Your data stays private.</div>

                        <p><center>——————or——————</center></p>

                        <button className='btn-primary' onClick={() => navigate("/model")}>Try Retina ↗</button>

                    </div>

                </motion.div>

            </div>
        </section>
    )
}
