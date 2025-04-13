import React, { useState, useEffect, useRef } from 'react';
import { Button, Input } from 'antd';
import { SendOutlined, CloseOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { BsRobot } from "react-icons/bs";
import { GoHubot } from "react-icons/go";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { FaUserSecret } from "react-icons/fa6";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './Chatbot.scss';

const { TextArea } = Input;

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const userId = isLoggedIn && user ? user.phoneNumber : null;
  const [messages, setMessages] = useState([
    {
      id: 0,
      text: "Xin chào! Tôi là Chatbot Zenith. Hôm nay tôi có thể giúp gì cho bạn?",
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null); // Thêm ref để cuộn

  // Cuộn xuống cuối danh sách tin nhắn
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen && userId) {
      fetchConversation();
    }
  }, [isOpen, userId, messages]);

  useEffect(() => {
    scrollToBottom(); // Cuộn xuống cuối mỗi khi messages thay đổi
  }, [messages]);

  const fetchConversation = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/conversation?user_id=${userId}`);
      const formattedMessages = response.data.flatMap((messagePair) =>
        messagePair.map((msg) => ({
          id: Date.now() + Math.random(),
          text: msg.content,
          sender: msg.role === 'user' ? 'user' : 'bot',
          timestamp: new Date().toLocaleTimeString(),
        }))
      );
      setMessages([messages[0], ...formattedMessages]);
      console.log("Fetched messages:", formattedMessages);
    } catch (error) {
      console.error("Error fetching conversation:", error);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString(),
    };

    // Thêm tin nhắn người dùng
    setMessages((prev) => [...prev, newMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await axios.get(`http://127.0.0.1:8000/message`, {
        params: { user_id: userId, question: inputValue },
        headers: { "Content-Type": "application/json" }
      });

      // Xử lý phản hồi từ API
      if (response.data && Array.isArray(response.data)) {
        const latestMessagePair = response.data[response.data.length - 1];
        if (latestMessagePair && latestMessagePair.length === 2) {
          const botReply = {
            id: Date.now() + 1,
            text: latestMessagePair[1].content,
            sender: "bot",
            timestamp: new Date().toLocaleTimeString(),
          };
          // Thêm câu trả lời bot ngay lập tức
          setMessages((prev) => [...prev, botReply]);
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="chatbot-container">
      {!isOpen && (
        <div className="chatbot-toggle-wrapper">
          <Button
            type="primary"
            shape="circle"
            className="chatbot-toggle"
            onClick={() => setIsOpen(true)}
          >
            <BsRobot size={24} className='chatbot-icon' />
          </Button>
          <div className="chatbot-preview-message">
            "Chào bạn! Bạn cần hỗ trợ gì hôm nay?"
          </div>
        </div>
      )}

      {isOpen && (
        <div className="chatbot-box">
          <div className="chatbot-header">
            <BsRobot size={24} />
            <span>Chatbot Zenith</span>
            <Button
              type="text"
              icon={<CloseOutlined />}
              onClick={() => setIsOpen(false)}
            />
          </div>

          <div className="chatbot-messages">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`message ${msg.sender === 'user' ? 'user' : 'bot'}`}
              >
                {msg.sender === 'user' && (
                  <Avatar
                    size="small"
                    className="message-avatar"
                    style={{ backgroundColor: '#1890ff' }}
                  >
                    <FaUserSecret size={20} />
                  </Avatar>
                )}
                <div className="message-content">
                  {msg.sender === 'bot' ? (
                    <div className="markdown-content">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {msg.text}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <p>{msg.text}</p>
                  )}
                  <span className="message-timestamp">{msg.timestamp}</span>
                </div>
                {msg.sender === 'bot' && (
                  <Avatar
                    size="small"
                    className="message-avatar"
                    style={{ backgroundColor: '#f56a00' }}
                  >
                    <GoHubot size={20} />
                  </Avatar>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="message bot">
                <div className="message-content typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <Avatar
                  size="small"
                  className="message-avatar"
                  style={{ backgroundColor: '#f56a00' }}
                >
                  <GoHubot size={20} />
                </Avatar>
              </div>
            )}
            <div ref={messagesEndRef} /> {/* Điểm neo để cuộn */}
          </div>

          <div className="chatbot-input">
            <TextArea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Nhập tin nhắn..."
              autoSize={{ minRows: 1, maxRows: 3 }}
              onPressEnter={(e) => {
                if (!e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <Button
              icon={<SendOutlined />}
              onClick={handleSendMessage}
              style={{ marginLeft: '8px'}}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;