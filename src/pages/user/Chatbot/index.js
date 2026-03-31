import React, { useState, useEffect, useRef } from 'react';
import { Button, Input } from 'antd';
import { SendOutlined, CloseOutlined, MenuOutlined, MessageOutlined, DeleteOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { BsRobot } from "react-icons/bs";
import { GoHubot } from "react-icons/go";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { FaUserSecret } from "react-icons/fa6";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../../../slices/cartSlice';
import './Chatbot.scss';

const { TextArea } = Input;

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, user, token } = useSelector((state) => state.auth);
  const userId = isLoggedIn && user ? user.phoneNumber || user.username : "guest";
  const [sessions, setSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [messages, setMessages] = useState([
    {
      id: 0,
      text: "Xin chào! Tôi là Chatbot Zenith. Hôm nay tôi có thể giúp gì cho bạn?",
      sender: 'bot',
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchSessions = async () => {
    try {
      if (!userId) return;
      const res = await axios.get(`http://127.0.0.1:8000/sessions/${userId}`);
      if (res.data && res.data.sessions) {
        setSessions(res.data.sessions);
      }
    } catch (err) {
      console.error("Error fetching sessions:", err);
    }
  };

  const handleNewChat = () => {
    setCurrentSessionId(null);
    setMessages([
      {
        id: 0,
        text: "Xin chào! Tôi là Chatbot Zenith. Hôm nay tôi có thể giúp gì cho bạn?",
        sender: 'bot',
      }
    ]);
  };

  const handleDeleteSession = async (e, sessionId) => {
    e.stopPropagation();
    try {
      await axios.delete(`http://127.0.0.1:8000/conversation/${userId}/${sessionId}`);
      setSessions((prev) => prev.filter(s => s.session_id !== sessionId));
      if (currentSessionId === sessionId) {
        handleNewChat();
      }
    } catch (e) {
      console.error("Error deleting session:", e);
    }
  };

  useEffect(() => {
    if (isOpen && userId) {
      fetchSessions();
    }
  }, [isOpen, userId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchConversation = async (sessionId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/conversation/${sessionId}`);
      if (response.data && response.data.messages) {
        const historyMessages = response.data.messages.map((msg, index) => ({
          id: `history-${index}`,
          text: msg.content,
          sender: msg.role === 'user' ? 'user' : 'bot',
          products: msg.products || [],
        }));
        setMessages([
          {
            id: 0,
            text: "Xin chào! Lịch sử trò chuyện đã được tải lại.",
            sender: 'bot',
          },
          ...historyMessages
        ]);
        setCurrentSessionId(sessionId);
      }
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
      const response = await axios.post(`http://127.0.0.1:8000/chat`, { 
        user_id: userId, 
        session_id: currentSessionId,
        question: inputValue 
      }, {
        headers: { "Content-Type": "application/json" }
      });

      // Xử lý phản hồi API
      if (response.data) {
        let botText = response.data.answer || "Xin lỗi, tôi không thể trả lời lúc này.";
        let isOrder = false;

        // Nếu Chatbot Python bắt được Intent đặt hàng và trả về is_order, hiển thị Nút chuyển trang Thanh toán
        if (response.data.is_order && response.data.products && response.data.products.length > 0 && isLoggedIn) {
          isOrder = true;
          // Khuyến nghị thêm text từ bot để báo có thể ấn nút xác nhận
          botText += `\n\n*(Nhấn "Đến Trang Thanh Toán" bên dưới để chọn phương thức thanh toán & hoàn tất Đơn hàng nhé)*`;
        }

        const botReply = {
          id: Date.now() + 1,
          text: botText,
          products: response.data.products || [],
          isOrder: isOrder,
          orderStatus: "PENDING", 
          sender: "bot",
        };
        setMessages((prev) => [...prev, botReply]);
        
        // Nếu bắt đầu phiên mới, cập nhật lại trạng thái sidebar
        if (response.data.session_id && response.data.session_id !== currentSessionId) {
          setCurrentSessionId(response.data.session_id);
          fetchSessions();
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMsg = {
        id: Date.now() + 1,
        text: "Không thể kết nối đến Bot! Vui lòng thử lại sau.",
        products: [],
        sender: "bot",
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleConfirmOrder = (msgId, product) => {
    // 1. Thêm sản phẩm vào Redux Cart State (mô phỏng người dùng đã thêm vào giỏ)
    dispatch(addToCart({
      id: product.product_id,
      name: product.product_name,
      price: product.price || 0,
      quantity: 1,
      imagePaths: [] 
    }));

    // 2. Chuyển trạng thái UI tin nhắn
    setMessages((prev) => prev.map(msg => msg.id === msgId ? { ...msg, orderStatus: "SUCCESS" } : msg));
    
    // 3. Đóng popup Chatbot & Chuyển thẳng họ qua trang Billing để chọn Phương thức Thanh toán
    setIsOpen(false);
    navigate('/billing');
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
        <div className={`chatbot-box ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
          <div className="chatbot-header">
            <div className="chatbot-title">
              <Button 
                type="text" 
                icon={<MenuOutlined />} 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
                style={{color: 'white', marginRight: '8px', fontSize: '18px'}}
              />
              <BsRobot size={24} style={{marginRight: 8}}/>
              <span>Chatbot Zenith</span>
            </div>
            <Button
              type="text"
              icon={<CloseOutlined />}
              onClick={() => setIsOpen(false)}
            />
          </div>

          <div className="chatbot-layout">
            <div className={`chatbot-sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
               <Button type="primary" block onClick={handleNewChat} className="new-chat-btn">
                 + Trò chuyện mới
               </Button>
               <div className="session-list">
                 {sessions.map(s => (
                   <div 
                      className={`session-item ${currentSessionId === s.session_id ? 'active' : ''}`} 
                      key={s.session_id} 
                      onClick={() => fetchConversation(s.session_id)}
                   >
                      <div className="session-content">
                        <MessageOutlined className="session-icon" />
                        <span className="session-title">{s.title || "Trò chuyện mới"}</span>
                      </div>
                      <DeleteOutlined 
                        className="delete-icon" 
                        title="Xóa cuộc trò chuyện này"
                        onClick={(e) => handleDeleteSession(e, s.session_id)} 
                      />
                   </div>
                 ))}
               </div>
            </div>

            <div className="chatbot-main-pane">
              <div className="chatbot-messages">
                {messages.map((msg) => (
              <div
                key={msg.id}
                className={`message ${msg.sender === 'user' ? 'user' : 'bot'}`}
              >
                {msg.sender === 'bot' && (
                  <Avatar
                    size="small"
                    className="message-avatar"
                    style={{ backgroundColor: '#f56a00' }}
                  >
                    <GoHubot size={20} />
                  </Avatar>
                )}
                
                <div className="message-content">
                  {msg.sender === 'bot' ? (
                    <div className="markdown-content">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {msg.text}
                      </ReactMarkdown>
                      {msg.products && msg.products.length > 0 && (
                        <div className="chatbot-product-list">
                          {msg.products.map((prod, idx) => (
                            <div className="chatbot-product-card" key={idx}>
                              <div className="product-details" onClick={() => window.open(`/product/${prod.product_id}`, '_blank')}>
                                <strong>{prod.product_name}</strong>
                                <span className="product-price">{prod.price ? Math.round(prod.price).toLocaleString() + 'đ' : 'Liên hệ'}</span>
                              </div>
                              <Button type="primary" size="small" style={{marginTop: 5, width: '100%'}} onClick={() => window.open(`/product/${prod.product_id}`, '_blank')}>Xem chi tiết</Button>
                              
                              {msg.isOrder && idx === 0 && (
                                <>
                                  {(!msg.orderStatus || msg.orderStatus === "PENDING") && (
                                    <Button 
                                      danger 
                                      type="primary" 
                                      size="small" 
                                      style={{marginTop: 5, width: '100%', background: '#ff4d4f'}} 
                                      onClick={(e) => { e.stopPropagation(); handleConfirmOrder(msg.id, prod);}}
                                    >
                                      Đến Trang Thanh Toán
                                    </Button>
                                  )}
                                  {msg.orderStatus === "SUCCESS" && (
                                    <Button disabled size="small" style={{marginTop: 5, width: '100%', color: "green"}}>
                                      Đã chuyển tới trang thanh toán
                                    </Button>
                                  )}
                                </>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <p>{msg.text}</p>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <Avatar
                    size="small"
                    className="message-avatar"
                    style={{ backgroundColor: '#1890ff' }}
                  >
                    <FaUserSecret size={20} />
                  </Avatar>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="message bot">
                <Avatar
                  size="small"
                  className="message-avatar"
                  style={{ backgroundColor: '#f56a00' }}
                >
                  <GoHubot size={20} />
                </Avatar>
                <div className="message-content typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
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

      </div> 
    </div>

  )}
</div>
  );
};

export default Chatbot;