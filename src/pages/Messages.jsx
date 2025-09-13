// Messages.jsx
import React, { useState, useEffect } from "react";
import { FiSend, FiSearch, FiChevronLeft } from "react-icons/fi";

export default function Messages() {
  // Static users
  const users = [
    { id: 1, name: "Ravi Kumar" },
    { id: 2, name: "Priya Sharma" },
    { id: 3, name: "Amit Singh" },
    { id: 4, name: "Sneha Reddy" },
    { id: 5, name: "Vikram Patel" },
    { id: 6, name: "Anjali Mehta" },
    { id: 7, name: "Rajesh Khanna" },
    { id: 8, name: "Neha Gupta" },
  ];

  // Static conversations
  const conversations = {
    1: [
      { from: "me", text: "Hi Ravi, how are you?" },
      { from: "Ravi Kumar", text: "I'm good, working on the reports." },
      { from: "me", text: "Great! When can you submit them?" },
      { from: "Ravi Kumar", text: "By tomorrow EOD for sure." },
    ],
    2: [
      { from: "me", text: "Hey Priya, did you check the CRM update?" },
      { from: "Priya Sharma", text: "Yes, looks smooth now!" },
      { from: "me", text: "Perfect! Any issues to report?" },
      { from: "Priya Sharma", text: "None so far. Working great!" },
    ],
    3: [
      { from: "Amit Singh", text: "Don't forget the meeting tomorrow." },
      { from: "me", text: "Thanks for the reminder!" },
      { from: "Amit Singh", text: "9 AM sharp in Conference Room B." },
      { from: "me", text: "Got it. I'll be there." },
    ],
    4: [
      { from: "me", text: "Sneha, can you share the document?" },
      { from: "Sneha Reddy", text: "Sure, I'll send it shortly." },
      { from: "me", text: "Thanks! Need it for the client meeting." },
      { from: "Sneha Reddy", text: "Just emailed it to you. Check your inbox." },
    ],
    5: [
      { from: "Vikram Patel", text: "The project deadline has been moved up." },
      { from: "me", text: "By how many days?" },
      { from: "Vikram Patel", text: "We need to deliver by Friday now." },
    ],
    6: [
      { from: "Anjali Mehta", text: "Can you review my proposal?" },
      { from: "me", text: "Sure, send it over and I'll take a look." },
    ],
    7: [
      { from: "Rajesh Khanna", text: "The client loved the presentation!" },
      { from: "me", text: "That's fantastic news! Great job team!" },
    ],
    8: [
      { from: "Neha Gupta", text: "Need your approval on the budget." },
      { from: "me", text: "I'll review it this afternoon." },
    ],
  };

  const [selectedUser, setSelectedUser] = useState(users[0]);
  const [messageInput, setMessageInput] = useState("");
  const [chatData, setChatData] = useState(conversations);
  const [search, setSearch] = useState("");
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
  const [showChat, setShowChat] = useState(false);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobileView(mobile);
      if (!mobile) {
        setShowChat(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle sending message
  const handleSend = () => {
    if (messageInput.trim() === "") return;

    const newMessage = { from: "me", text: messageInput };
    const updatedChat = {
      ...chatData,
      [selectedUser.id]: [...(chatData[selectedUser.id] || []), newMessage],
    };

    setChatData(updatedChat);
    setMessageInput("");
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    if (isMobileView) {
      setShowChat(true);
    }
  };

  const handleBackToContacts = () => {
    setShowChat(false);
  };

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      className="messages-container"
      style={{
        display: "flex",
        height: "calc(100vh - 72px - 3rem)", // Full height minus navbar and padding
        backgroundColor: "#fff",
        fontFamily: "'Inter', 'SF Pro Display', -apple-system, sans-serif",
        overflow: "hidden",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
        width: "100%",
        position: "relative",
      }}
    >
      {/* Sidebar Users - Hidden on mobile when chat is shown */}
      <div
        className="contacts-sidebar"
        style={{
          width: isMobileView && showChat ? "0" : "280px",
          flexShrink: 0,
          borderRight: "1px solid #e2e8f0",
          backgroundColor: "#f9fafb",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          transition: "width 0.3s ease",
          ...(isMobileView && {
            position: showChat ? "absolute" : "relative",
            left: showChat ? "-100%" : "0",
            width: "100%",
            zIndex: 10,
            borderRight: "none",
          }),
        }}
      >
        <div style={{ padding: "1rem", borderBottom: "1px solid #e2e8f0" }}>
          <h2
            style={{
              color: "#00aaff",
              fontSize: "1.2rem",
              margin: "0 0 1rem 0",
              fontWeight: "600",
            }}
          >
            Messages
          </h2>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#fff",
              border: "1px solid #cbd5e1",
              borderRadius: "8px",
              padding: "0.5rem 0.75rem",
            }}
          >
            <FiSearch color="#64748b" size={18} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search contacts..."
              style={{
                border: "none",
                outline: "none",
                flex: 1,
                marginLeft: "0.5rem",
                fontSize: "0.9rem",
                padding: "0.25rem",
                backgroundColor: "transparent",
              }}
            />
          </div>
        </div>

        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "0.25rem",
          }}
        >
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              onClick={() => handleUserSelect(user)}
              style={{
                padding: "0.75rem 1rem",
                borderRadius: "8px",
                cursor: "pointer",
                margin: "0.25rem 0",
                backgroundColor:
                  selectedUser.id === user.id ? "#e0e7ff" : "transparent",
                color: selectedUser.id === user.id ? "#00aaff" : "#374151",
                fontWeight: selectedUser.id === user.id ? "600" : "400",
                display: "flex",
                alignItems: "center",
                transition: "all 0.2s ease",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "#00aaff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: "500",
                  marginRight: "0.75rem",
                  flexShrink: 0,
                }}
              >
                {user.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div style={{ overflow: "hidden", flex: 1 }}>
                <div style={{ fontWeight: "500" }}>{user.name}</div>
                {chatData[user.id] && chatData[user.id].length > 0 && (
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: "#64748b",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {chatData[user.id][chatData[user.id].length - 1].text}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window - Hidden on mobile when contacts are shown */}
      <div
        className="chat-window"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          ...(isMobileView && {
            position: "absolute",
            left: showChat ? "0" : "100%",
            width: "100%",
            height: "100%",
            transition: "left 0.3s ease",
          }),
        }}
      >
        {/* Chat Header */}
        <div
          style={{
            borderBottom: "1px solid #e2e8f0",
            padding: "1rem",
            backgroundColor: "#f8fafc",
            display: "flex",
            alignItems: "center",
          }}
        >
          {isMobileView && (
            <button
              onClick={handleBackToContacts}
              style={{
                background: "none",
                border: "none",
                marginRight: "0.75rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FiChevronLeft size={24} color="#64748b" />
            </button>
          )}
          <div
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              backgroundColor: "#00aaff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: "500",
              marginRight: "0.75rem",
              flexShrink: 0,
            }}
          >
            {selectedUser.name.split(" ").map(n => n[0]).join("")}
          </div>
          <div style={{ overflow: "hidden" }}>
            <h2 style={{ margin: 0, color: "#1e293b", fontSize: "1.1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {selectedUser.name}
            </h2>
            <p style={{ margin: 0, color: "#64748b", fontSize: "0.8rem" }}>
              Online
            </p>
          </div>
        </div>

        {/* Chat Messages */}
        <div
          style={{
            flex: 1,
            padding: "1rem",
            overflowY: "auto",
            backgroundColor: "#fff",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {(chatData[selectedUser.id] || []).map((msg, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: msg.from === "me" ? "flex-end" : "flex-start",
                marginBottom: "0.75rem",
              }}
            >
              <div
                style={{
                  padding: "0.75rem 1rem",
                  borderRadius: "18px",
                  maxWidth: "85%",
                  backgroundColor: msg.from === "me" ? "#00aaff" : "#f1f5f9",
                  color: msg.from === "me" ? "#fff" : "#1e293b",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                  wordWrap: "break-word",
                }}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div
          style={{
            borderTop: "1px solid #e2e8f0",
            padding: "1rem",
            display: "flex",
            gap: "0.75rem",
            backgroundColor: "#f9fafb",
          }}
        >
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Type a message..."
            style={{
              flex: 1,
              padding: "0.75rem 1rem",
              borderRadius: "24px",
              border: "1px solid #cbd5e1",
              outline: "none",
              fontSize: "0.95rem",
              fontFamily: "inherit",
            }}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            disabled={!messageInput.trim()}
            style={{
              backgroundColor: messageInput.trim() ? "#00aaff" : "#cbd5e1",
              border: "none",
              color: "#fff",
              borderRadius: "50%",
              width: "46px",
              height: "46px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: messageInput.trim() ? "pointer" : "not-allowed",
              transition: "background-color 0.2s ease",
              flexShrink: 0,
            }}
          >
            <FiSend size={18} />
          </button>
        </div>
      </div>

      {/* Responsive styles */}
      <style>
        {`
          @media (max-width: 768px) {
            .messages-container {
              flex-direction: column;
              height: calc(100vh - 72px - 1.5rem) !important;
              border-radius: 0;
              position: relative;
              overflow: hidden;
            }
            
            .contacts-sidebar {
              width: 100% !important;
              height: 100% !important;
              border-right: none;
            }
            
            .chat-window {
              width: 100% !important;
              height: 100% !important;
            }
          }
          
          @media (max-width: 480px) {
            .messages-container {
              height: calc(100vh - 72px) !important;
              border-radius: 0;
            }
            
            input {
              font-size: 16px !important; /* Prevents zoom on iOS */
            }
          }
        `}
      </style>
    </div>
  );
}