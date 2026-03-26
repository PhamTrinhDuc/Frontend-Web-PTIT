import { Form, Input, message, Button, Alert, Divider } from 'antd';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import './SignUp.scss';
import { post } from '../../../utils/requests';

function SignUp() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    setErrorMessage("");
    try {
      const payload = {
        username: values.username,
        password: values.password,
        confirmPassword: values.confirmPassword
      };

      const response = await post('auth/register', payload);

      if (response) {
        message.success({ content: 'Account created successfully! Please login.', duration: 3 });
        form.resetFields();
        navigate('/login');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      setErrorMessage(error.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    // TODO: Google OAuth integration logic goes here
    message.loading("Redirecting to Google authentication...", 2);
    // Typical Flow: window.location.href = 'http://localhost:8080/oauth2/authorization/google';
    setTimeout(() => {
      message.info("Google OAuth placeholder active. Implement OAuth2 flow on the backend.");
    }, 2000);
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-box">
        <div className="signup-header">
          <h2>Create an account</h2>
          <p>Join Zenith today</p>
        </div>

        {errorMessage && (
          <Alert
            message="Error"
            description={errorMessage}
            type="error"
            showIcon
            closable
            onClose={() => setErrorMessage("")}
            className="signup-alert"
          />
        )}

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
          className="signup-form"
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: 'Please input your username!' },
              { min: 3, message: 'Username must be at least 3 characters.' }
            ]}
          >
            <Input 
              prefix={<UserOutlined className="site-form-item-icon" />} 
              placeholder="Username" 
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 6, message: 'Password must be at least 6 characters.' }
            ]}
          >
            <Input.Password 
              prefix={<LockOutlined className="site-form-item-icon" />} 
              placeholder="Password" 
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords do not match!'));
                },
              }),
            ]}
          >
            <Input.Password 
              prefix={<LockOutlined className="site-form-item-icon" />} 
              placeholder="Confirm Password" 
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              className="submit-btn" 
              size="large"
              loading={loading}
              block
            >
              SIGN UP
            </Button>
          </Form.Item>

          <Divider className="divider-text" plain>OR</Divider>

          <Form.Item>
            <Button 
              className="google-btn" 
              icon={<GoogleOutlined />} 
              size="large" 
              onClick={handleGoogleSignup}
              block
            >
              Sign up with Google
            </Button>
          </Form.Item>

          <div className="login-prompt">
            Already have an account? <Link to="/login">Log In</Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default SignUp;
