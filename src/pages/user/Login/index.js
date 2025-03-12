import { Form, Input, message, Button } from 'antd';
import { Link } from 'react-router-dom';
import login from '../../../assets/images/login.png';
import './Login.scss';

const { Item } = Form;

function Login() {

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      // Gửi dữ liệu đến backend
      const response = await fetch.post('YOUR_BACKEND_API_URL', values);
      message.success('Login successful!'); // Thông báo thành công
      form.resetFields(); // Xóa form (tùy chọn, tùy thuộc vào logic)
      // Thêm logic chuyển hướng sau khi đăng nhập thành công (ví dụ: useHistory từ react-router)
    } catch (error) {
      console.error('Login failed:', error);
      message.error('Login failed. Please try again.'); // Thông báo lỗi
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
                Sign In
              </Button>
            </Item>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Login;