import React, { useState, useEffect } from 'react';
import { Typography } from 'antd';
import './CountdownTimer.scss';
import { TbRectangleVerticalFilled } from "react-icons/tb";

const { Text } = Typography;

function CaculateTimeLeft(targetDate) {
  if (!targetDate) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const endDate = new Date(targetDate);
  const now = new Date();
  const difference = endDate - now;

  if (difference <= 0) {
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

const CountdownTimer = ({ title, endDate }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Update timer every second
  useEffect(() => {
    if (!endDate) return;

    const timer = setInterval(() => {
      setTimeLeft(CaculateTimeLeft(endDate));
    }, 1000);

    // Initial calculation
    setTimeLeft(CaculateTimeLeft(endDate));

    return () => clearInterval(timer);
  }, [endDate]);

  return (
    <div className='count-down-container'>
      <div className='countdown-title'>
        <TbRectangleVerticalFilled className='label-icon' />
        <h1>Today's</h1>
      </div>

      <div className='countdown-content'>
        <h2 className='title'>{title || "Flash Sales"}</h2>

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
  )
}
export default CountdownTimer;