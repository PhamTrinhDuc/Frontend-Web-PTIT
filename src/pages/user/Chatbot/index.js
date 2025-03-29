import React, { useState, useEffect } from 'react';
import { Button, Input } from 'antd';
import { SendOutlined, CloseOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { BsRobot  } from "react-icons/bs";
import { GoHubot } from "react-icons/go";
import axios from 'axios';
import { FaUserSecret } from "react-icons/fa6";
import { GiRobotAntennas } from "react-icons/gi";
import './Chatbot.scss';

const { TextArea } = Input;

const Chatbot = ({ userId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 0,
      text: "Xin chào! Tôi là Chatbot Zenith. Hôm nay tôi có thể giúp gì cho bạn?",
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (isOpen && userId) {
      fetchConversation();
    }
  }, [isOpen, userId]);

  const fetchConversation = async () => {
    try {
      const response = await fetch(`https://your-api-endpoint/conversation/${userId}`);
      // Kết hợp tin nhắn mặc định với dữ liệu từ API
      setMessages([messages[0], ...(response.data.messages || [])]);
    } catch (error) {
      console.error('Error fetching conversation:', error);
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

    try {
      await axios.post('http://127.0.0.1:8000/messag', {
        user_id: userId,
        message: inputValue,
      });
    } catch (error) {
      console.error('Error sending message:', error);
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
          </div>

          <div className="chatbot-input">
            <TextArea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Nhập tin nhắn..."
              autoSize={{ minRows: 1, maxRows: 3 }}
              onPressEnter={handleSendMessage}
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