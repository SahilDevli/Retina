import React from "react";
import { Routes, Route } from "react-router-dom";

import LoginIntro from "./components/LoginIntro";
import HowToUse from "./components/HowToUse";
import AboutDiseases from "./components/AboutDiseases";
import ChatBot from "./components/Chatbot";
import Appli from "./components/ApplicationPage";


export default function App() {
  return (
    <Routes>

      {/* Landing Page */}
      <Route
        path="/"
        element={
          <div className="app-root">
            <LoginIntro />
            <HowToUse />
            <AboutDiseases />
            <footer className="mv-footer">
              © {new Date().getFullYear()} Retina — Intelligent Ocular Screening
            </footer>
          </div>
        }
      />

      {/* Model Page */}
      <Route path="/model" element={<Appli />} />

      {/* Chat bot */}
      <Route path="/chatbot" element={<ChatBot />} />

    </Routes>
  );
}