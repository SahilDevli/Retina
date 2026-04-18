import React, { useState } from "react";
import "../styles/LoginIntro.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import api from "../api/axios";
import Docter from "./Docter.webp";

export default function LoginIntro() {
  const [showOtp, setShowOtp] = useState(false);
  const [contact, setContact] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const navigate = useNavigate();

  const sendOtp = async () => {
    if (loading) return;

    setErr("");

    if (!contact.trim()) {
      setErr("Please enter email.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contact)) {
      setErr("Please enter a valid email.");
      return;
    }

    setLoading(true);

    try {
      const { data } = await api.post("/send-otp", { contact });

      if (data.success) {
        setShowOtp(true);
      } else {
        setErr(data.message || "Failed to send OTP");
      }
    } catch (error) {
      if (error.response) {
        setErr(error.response?.data?.message || "Failed to send OTP");
      } else {
        setErr("Server not responding");
      }
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (loading) return;

    setErr("");

    if (!otp.trim()) {
      setErr("Please enter OTP");
      return;
    }

    setLoading(true);

    try {
      const { data } = await api.post("/verify-otp", {
        contact,
        otp
      });

      if (data.success) {
        navigate("/chatbot");
      } else {
        setErr(data.message || "Invalid OTP");
      }
    } catch (error) {
      if (error.response) {
        setErr(error.response?.data?.message || "Invalid OTP");
      } else {
        setErr("Server not responding");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-intro">
      <div className="login-inner container">
        <img
          src={Docter}
          alt="doctor"
          className="docSab"
          title="Greetings, I am Retina"
        />

        <motion.div
          className="intro-left"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="mv-title">Retina</h1>

          <p className="mv-sub">
            An Integrated Deep Learning System for{" "}
            <span>Comprehensive Ocular Disease</span>.
          </p>

          <div className="login-card">
            <label className="label">Email</label>

            <input
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="input"
              placeholder="example@mail.com"
              disabled={showOtp}
            />

            {err && <p className="error-text">{err}</p>}

            {!showOtp ? (
              <button
                className="btn-primary"
                onClick={sendOtp}
                disabled={loading}
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            ) : (
              <div className="otp-row">
                <input
                  className="otp-input"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />

                <button
                  className="btn-primary small"
                  onClick={verifyOtp}
                  disabled={loading}
                >
                  {loading ? "Verifying..." : "Next ›"}
                </button>
              </div>
            )}

            {showOtp && (
              <button className="resend-otp" onClick={sendOtp}>
                Resend OTP
              </button>
            )}

            <div className="login-hint">
              We accept valid emails. Your data stays private.
            </div>

            <p style={{ textAlign: "center" }}>——————or——————</p>

            <button className="btn-primary" onClick={() => navigate("/model")}>
              Try Retina ↗
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}