import React, { useState, useEffect } from 'react';
import { Button, Input } from 'antd';
import { SendOutlined, CloseOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { BsRobot  } from "react-icons/bs";
import { GoHubot } from "react-icons/go";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { FaUserSecret } from "react-icons/fa6";
import { GiRobotAntennas } from "react-icons/gi";
import './Chatbot.scss';

const { TextArea } = Input;


const formatMessages = (rawData) => {
  if (!Array.isArray(rawData) || rawData.length === 0) return [];

  // Lấy mảng tin nhắn đầu tiên từ backend
  const messagesList = rawData[0] || [];

  // Chuyển đổi sang định dạng phù hợp với frontend
  return messagesList.map((msg, index) => ({
    id: index, // Tạo ID tạm thời dựa trên index
    text: msg.content, // Nội dung tin nhắn
    sender: msg.role === "user" ? "user" : "bot", // Xác định người gửi
    timestamp: new Date().toLocaleTimeString(), // Tạo timestamp tạm thời
  }));
};


const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  // const userId  = user?.phoneNumber;
  const userId = "0962741764";
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

  useEffect(() => {
    if (isOpen && userId) {
      fetchConversation();
    }
  }, [isOpen, userId]);

  useEffect(() => {
    if (userId) {
      fetchConversation();
    }
  }, [userId]);

  const fetchConversation = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/conversation?user_id=${userId}`);
  
      // Format lại dữ liệu trước khi lưu vào state
      const formattedMessages = formatMessages(response.data);
  
      // Cập nhật state
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

    setMessages([...messages, newMessage]);
    setInputValue('');
    setIsTyping(true); // Bắt đầu hiển thị trạng thái "đang nhập" của bot

    try {
      const response = await axios.get(`http://127.0.0.1:8000/message`, {
        params: { user_id: userId, question: inputValue },
        headers: { "Content-Type": "application/json" }
      });

      console.log("Bot response:", response.data);
    
      // Xử lý phản hồi từ bot
      if (response.status && response.data) {
        const botReply = {
          id: Date.now(),
          text: response.data,
          sender: "bot",
          timestamp: new Date().toLocaleTimeString(),
        };
        setMessages((prev) => [...prev, botReply]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsTyping(false); // Kết thúc trạng thái "đang nhập" của bot
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
          {/* Tin nhắn mặc định ở icon */}
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
                  <p>{msg.text}</p>
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
            
            {/* Hiển thị dấu ba chấm khi đang đợi bot trả lời */}
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
          </div>

          {/* Khu vực nhập tin nhắn */}
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