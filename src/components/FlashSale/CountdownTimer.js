import React, { useState, useEffect } from 'react';
import { Typography } from 'antd';
import './CountdownTimer.scss';
import { TbRectangleVerticalFilled } from "react-icons/tb";

const { Text } = Typography;


// Đặt một ngày kết thúc cố định (end date) cho Flash Sale.
// Tính toán thời gian còn lại (ngày, giờ, phút, giây) và cập nhật mỗi giây.
// Sử dụng Ant Design Typography.Text để hiển thị các giá trị đếm ngược


function CaculateTimeLeft() {
  const endDate = new Date('2025-03-15T00:00:00');
  const now = new Date();
  const difference = endDate - now;

  if (difference <= 0 ){
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    }
  }
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60)
  }
}

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState(CaculateTimeLeft());

  // Cập nhật thời gian mỗi giây
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(CaculateTimeLeft());
    }, 1000);

    // Dọn dẹp interval khi component unmount
    return () => clearInterval(timer);
  }, []);

  return (
    <>
    <div className='count-down-container'>
      <div className='countdown-title'>
        <TbRectangleVerticalFilled className='label-icon' /> 
        <h1>Today's</h1>
      </div>

      <div className='countdown-content'>
        <h2 className='title'>Flash Sales</h2>

        <div className='timer'>
          <div className='clock-labels'>
            <span>Days</span>
            <span>Hours</span>
            <span>Minutes</span>
            <span>Seconds</span>
          </div>

          <div className='clock'>
            <Text className="value">{String(timeLeft.days).padStart(2, '0')}</Text>
              <span className="separator">:</span>
              <Text className="value">{String(timeLeft.hours).padStart(2, '0')}</Text>
              <span className="separator">:</span>
              <Text className="value">{String(timeLeft.minutes).padStart(2, '0')}</Text>
              <span className="separator">:</span>
              <Text className="value">{String(timeLeft.seconds).padStart(2, '0')}</Text>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
export default CountdownTimer;