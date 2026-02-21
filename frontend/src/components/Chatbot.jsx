import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/chatbot.css";

const initialMessages = [
  {
    id: 1,
    from: "assistant",
    text:
      "Hi — upload a fundus photo or ask a question about a retinal scan. I can help detect Diabetic Retinopathy, Diabetic Macular Edema (DME) and signs of Glaucoma.",
    time: Date.now(),
  },
];

function ChatMessage({ msg }) {
  return (
    <div className={`chat-message ${msg.from}`}>
      <div className="avatar">{msg.from === "assistant" ? "AI" : "You"}</div>
      <div className="bubble">
        {msg.image && (
          <img src={msg.image} alt="uploaded" className="thumb" />
        )}
        <div className="text">{msg.text}</div>
        <div className="time">
          {new Date(msg.time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
}

export default function Chatbot() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef();
  const listRef = useRef();

  useEffect(() => {
    if (listRef.current)
      listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages]);

  function pushMessage(msg) {
    setMessages((m) => [...m, { id: Date.now() + Math.random(), ...msg }]);
  }

  function handleSend() {
    const text = input.trim();
    if (!text) return;

    pushMessage({ from: "user", text, time: Date.now() });
    setInput("");

    pushMessage({
      from: "assistant",
      text: "Analyzing... ⏳",
      time: Date.now(),
    });

    simulateAnalysis(text).then((resp) => {
      setMessages((prev) => {
        const withoutAnalyzing = prev.filter(
          (_, idx) => idx !== prev.length - 1
        );

        const cleanedText = resp.text.replace(
          /Note: These are model outputs[\s\S]*/g,
          ""
        );

        return [
          ...withoutAnalyzing,
          {
            id: Date.now() + Math.random(),
            from: "assistant",
            text: cleanedText,
            time: resp.time,
          },
        ];
      });
    });
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    setUploading(true);

    reader.onload = () => {
      const dataUrl = reader.result;

      pushMessage({
        from: "user",
        text: "Uploaded fundus image",
        image: dataUrl,
        time: Date.now(),
      });

      pushMessage({
        from: "assistant",
        text: "Analyzing uploaded image... ⏳",
        time: Date.now(),
      });

      simulateAnalysis({ image: true, name: file.name }).then((resp) => {
        setUploading(false);

        setMessages((prev) => {
          const withoutAnalyzing = prev.filter(
            (_, idx) => idx !== prev.length - 1
          );

          const cleanedText = resp.text.replace(
            /Note: These are model outputs[\s\S]*/g,
            ""
          );

          return [
            ...withoutAnalyzing,
            {
              id: Date.now() + Math.random(),
              from: "assistant",
              text: cleanedText,
              time: resp.time,
            },
          ];
        });
      });
    };

    reader.readAsDataURL(file);
    e.target.value = "";
  }

  const quickPrompts = [
    "Check for diabetic retinopathy signs",
    "Look for macular edema",
    "Assess for glaucoma risk",
    "Explain the report in simple words",
  ];

  return (
    <div className="chatbot">

      {/* ====== TOP-RIGHT NAVIGATION LINKS ====== */}
      <div className="top-nav">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/model" className="nav-link">Run Model</Link>
      </div>

      {/* HEADER */}
      <div className="chat-header">
        <div className="title">Retina — AI Assistant</div>
        <div className="subtitle">
          Upload a fundus scan or ask anything related to retina.
        </div>

        <div className="actions">
          <label className={`upload-btn ${uploading ? "loading" : ""}`}>
            Upload fundus
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
        </div>
      </div>

      {/* CHAT BODY */}
      <div className="chat-body" ref={listRef}>
        {messages.map((m) => (
          <ChatMessage key={m.id} msg={m} />
        ))}

        {/* FIXED NOTE */}
        <div className="footer-note">
          ⚠ Research-only AI. Not for clinical diagnosis.
        </div>
      </div>

      {/* QUICK PROMPTS */}
      <div className="quick-row">
        {quickPrompts.map((q) => (
          <button key={q} className="quick" onClick={() => setInput(q)}>
            {q}
          </button>
        ))}
      </div>

      {/* INPUT AREA */}
      <div className="chat-input">
        <div className="input-wrapper">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message or paste an image..."
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
        </div>

        <button className="send" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
}

/* Simulation function (unchanged) */
function simulateAnalysis(context) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const dr = (Math.random() * 0.8).toFixed(2);
      const dme = (Math.random() * 0.7).toFixed(2);
      const glaucoma = (Math.random() * 0.6).toFixed(2);

      const textLines = [
        context.image
          ? `Analysis complete for uploaded image ${context.name || ""}`
          : `Analysis based on your query: "${context}"`,
        "",
        `• Diabetic Retinopathy risk score: ${(dr * 100).toFixed(0)}%`,
        `• Diabetic Macular Edema score: ${(dme * 100).toFixed(0)}%`,
        `• Glaucoma risk score: ${(glaucoma * 100).toFixed(0)}%`,
        "",
        "Note: These are model outputs for research purposes.",
      ].join("\n");

      resolve({ text: textLines, time: Date.now() });
    }, 1300 + Math.random() * 1200);
  });
}
