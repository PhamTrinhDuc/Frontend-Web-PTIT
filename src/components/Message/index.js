import React from "react";
import ReactMarkdown from "react-markdown";
import "./Message.scss";

const Message = ({ message }) => {
  return (
    <div className={`message ${message.sender === "user" ? "user" : "bot"}`}>
      <div className="message-content">
        <ReactMarkdown>{message.text}</ReactMarkdown>
        <span className="message-timestamp">{message.timestamp}</span>
      </div>
    </div>
  );
};

export default Message;