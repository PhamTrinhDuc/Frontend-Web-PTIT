import { Form, Input, message, Button, Alert } from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import './Login.scss';
import {login} from '../../../slices/authSlice';
import {post} from '../../../utils/requests';
import { setCookie } from '../../../utils/cookie';


const { Item } = Form;

function Login() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const onFinish = async (values) => {
    try {
      const response = await post('auth/login', values); 
      console.log(response);
      if (response && response.accessToken) {
        message.success('Login successful!');
        form.resetFields();
        // Xử lý lưu token vào localStorage hoặc Redux store
        // localStorage.setItem('token', response.accessToken);

        // setCookie('userId', response.id, 7);
        // setCookie('username', response.username, 7);
        // setCookie('email', response.email, 7);
        // setCookie('phone', response.gender)
        // setCookie('address', response.image)
        // setCookie('accessToken', response.accessToken, 7);
        // setCookie('refreshToken', response.refreshToken, 7);
        dispatch(login({
          token: response.accessToken, 
          user: {
            username: response.username, // Điều chỉnh theo response thực tế
            email: response.email,       // Tùy chọn, nếu API trả về
            phone: response.phone,       // Tùy chọn, nếu API trả về
            address: response.address,   // Tùy chọn, nếu API trả về
          },
        }));
        navigate('/');

      } else {
        setErrorMessage(response?.message || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Login failed. Please try again.");
    }
  };

  return (
    <>
      <div className='login-container'>
        <div className='illustration'></div>
        <div className='login-form'>
          <h2>Login To Zenith</h2>
          <p className='desciption'>
            Enter your details below to continue
          </p>
          {/* Hiển thị Alert khi có lỗi */}
          {errorMessage && (
            <Alert
              message="Login Failed"
              description={errorMessage}
              type="error"
              showIcon
              closable
              onClose={() => setErrorMessage("")} // Đóng alert khi click vào 'X'
              className="error-alert"
            />
          )}

          <Form
            form={form}
            layout='vertical'
            onFinish={onFinish}
            requiredMark={false}
          >
            <Item
              name="username"
              label="Username"
              className='item'
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input placeholder='Enter your username'/>
            </Item>

            <Item
              name="password"
              label="Password"
              className='item'
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input placeholder='Enter your password'/>
            </Item>

            <div className="forgot-password">
              <Link to="/forgot-password">Forget Password?</Link>
            </div>
            <Item>
              <Button type="primary" htmlType="submit" className="login-btn">
                Login
              </Button>
            </Item>

            <Item>
              <Button type="primary" 
                className="login-btn"
                icon={<FcGoogle />}
                onClick={() => window.location.href = 'URL_GOOGLE_AUTH'}
              >
                Login with Google
              </Button>
            </Item>

            <div className='signup-link'>
              <span>You are new to Zenith?</span>
              <Link className='signup' to='/signup'>Sign up</Link>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Login;