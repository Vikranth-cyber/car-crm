import React, { useState, useRef, useEffect } from "react";

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, text: "Welcome! How can we help you today?", sender: "admin", timestamp: new Date() }
  ]);
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim() === "") return;
    
    const newMessage = {
      id: messages.length + 1,
      text: message,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages([...messages, newMessage]);
    setMessage("");
    
    // Simulate auto-reply after a short delay
    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        {
          id: prev.length + 1,
          text: "Thanks for your message. We'll get back to you shortly.",
          sender: "admin",
          timestamp: new Date()
        }
      ]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const buttonStyle = {
    position: "fixed",
    bottom: "1.5rem",
    right: "1.5rem",
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #3b82f6, #0ea5e9)",
    color: "#fff",
    fontSize: "1.5rem",
    fontWeight: "bold",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 10px 25px rgba(59, 130, 246, 0.4)",
    transition: "all 0.3s ease",
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      transform: "scale(1.1)",
      boxShadow: "0 15px 30px rgba(59, 130, 246, 0.5)"
    }
  };

  const chatBoxStyle = {
    position: "fixed",
    bottom: "5.5rem",
    right: "1.5rem",
    width: "90%",
    maxWidth: "360px",
    height: "450px",
    background: "#ffffff",
    borderRadius: "1rem",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
    display: isOpen ? "flex" : "none",
    flexDirection: "column",
    overflow: "hidden",
    zIndex: 1000,
    border: "1px solid #e2e8f0",
    "@media (max-width: 640px)": {
      width: "90%",
      right: "5%",
      bottom: "6rem"
    }
  };

  const headerStyle = {
    background: "linear-gradient(135deg, #3b82f6, #0ea5e9)",
    color: "#fff",
    padding: "1rem 1.25rem",
    fontWeight: "600",
    fontSize: "1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  };

  const messagesContainerStyle = {
    flex: 1,
    padding: "1rem",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
    backgroundColor: "#f8fafc"
  };

  const messageStyle = (sender) => ({
    maxWidth: "80%",
    padding: "0.75rem 1rem",
    borderRadius: sender === "user" ? "1rem 1rem 0.25rem 1rem" : "1rem 1rem 1rem 0.25rem",
    alignSelf: sender === "user" ? "flex-end" : "flex-start",
    backgroundColor: sender === "user" ? "#3b82f6" : "#e2e8f0",
    color: sender === "user" ? "#fff" : "#334155",
    fontSize: "0.875rem",
    lineHeight: "1.4",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
  });

  const timestampStyle = {
    fontSize: "0.625rem",
    color: "#94a3b8",
    marginTop: "0.25rem",
    textAlign: "right"
  };

  const inputContainerStyle = {
    display: "flex",
    borderTop: "1px solid #e2e8f0",
    backgroundColor: "#fff"
  };

  const inputStyle = {
    flex: 1,
    padding: "0.875rem 1rem",
    border: "none",
    outline: "none",
    fontSize: "0.875rem",
    "&:focus": {
      outline: "none"
    }
  };

  const sendButtonStyle = {
    padding: "0.875rem 1rem",
    border: "none",
    background: "linear-gradient(135deg, #3b82f6, #0ea5e9)",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "600",
    transition: "all 0.2s ease",
    "&:hover": {
      background: "linear-gradient(135deg, #2563eb, #0284c7)"
    },
    "&:disabled": {
      background: "#94a3b8",
      cursor: "not-allowed"
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        style={buttonStyle}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open chat"
      >
        💬
        {!isOpen && (
          <span style={{
            position: "absolute",
            top: "-5px",
            right: "-5px",
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            backgroundColor: "#ef4444",
            color: "white",
            fontSize: "0.75rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            1
          </span>
        )}
      </button>

      {/* Chat Box */}
      <div style={chatBoxStyle}>
        <div style={headerStyle}>
          <span>Team Chat Support</span>
          <button 
            onClick={() => setIsOpen(false)} 
            style={{ 
              background: "none", 
              border: "none", 
              color: "#fff", 
              cursor: "pointer",
              fontSize: "1.25rem"
            }}
            aria-label="Close chat"
          >
            ✕
          </button>
        </div>
        
        <div style={messagesContainerStyle}>
          {messages.map((msg) => (
            <div key={msg.id} style={messageStyle(msg.sender)}>
              {msg.text}
              <div style={timestampStyle}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        <div style={inputContainerStyle}>
          <input 
            type="text" 
            placeholder="Type a message..." 
            style={inputStyle}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button 
            style={sendButtonStyle} 
            onClick={handleSendMessage}
            disabled={message.trim() === ""}
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}