import React from 'react'
import '../styles/HowToUse.css'
import { motion } from 'framer-motion'

const steps = [
    {
        title: 'Log In / Register',
        text: 'Log in or register with your email or Indian phone number to access your saved reports anytime. Enter your number or email and click “Send OTP” to receive a code. Enter the OTP and click the Next button to continue.'
    },
    {
        title: 'Using Retina',
        text: 'Retina offers report history, a chatbot, and document upload (retinal scans). After uploading a retinal image (.jpg, .jpeg, .png), your detailed report will appear in the chat area.'
    },
    {
        title: 'Chat & Actions',
        text: 'Use the chatbot to clarify doubts or ask for suggestions. Click Share, Download, or Save Chat to store or share your report.'
    }
]

export default function HowToUse(){
    return (
        <section className="howto-section">
            <div className="container">
                <motion.h2 className="howto-title" initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>How to use Retina</motion.h2>

                <div className="steps-grid">

                    {steps.map((s, i)=> (
                    <motion.div key={i} className="step-card" whileHover={{ scale: 1.03 }}>

                    <div className="step-num">{i+1}</div>
                    <h3 className="step-title">{s.title}</h3>
                    <p className="step-text">{s.text}</p>
                    </motion.div>
                    ))}

                </div>

            </div>
        </section>
    )
}