import { Form, Input, message, Button } from 'antd';
import { Link } from 'react-router-dom';
import './SignUp.scss';
import { FcGoogle } from "react-icons/fc";
import { post } from '../../../utils/requests';
import { useNavigate } from 'react-router-dom';
import Password from 'antd/es/input/Password';


const { Item } = Form;

function SignUp() {

  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      // Gửi dữ liệu đến backend
      console.log('Form values:', values);
      const response = await post('auth/register', values);
      console.log('Response:', response);
      navigate('/login');
      form.resetFields(); // Xóa form (tùy chọn, tùy thuộc vào logic)
      // Thêm logic chuyển hướng sau khi đăng nhập thành công (ví dụ: useHistory từ react-router)
    } catch (error) {
      console.error('Login failed:', error);
      message.error('Login failed. Please try again.'); // Thông báo lỗi
    }
  };

  return (
    <>
      <div className='signup-container'>

        <div className='illustration'></div>
          
        <div className='signup-form'>
          <h2>Create an account</h2>
          <p className='desciption'>
            Enter your details below to create your account
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

            {/* <Item
              name="address"
              label="Email or Phone Number"
              className='item'
              rules={[{ required: true, message: 'Please input your email or phone number!' }]}
            >
              <Input placeholder='Enter your email or phone number'/>
            </Item> */}

            <Item
              name="password"
              label="Password"
              className='item'
              rules={[{ required: true, type: Password, message: 'Please input your password!' }]}
            >
              <Input.Password placeholder='Enter your password'/>
            </Item>

            <Item
              name="confirmPassword"
              label="Confirm Password"
              className='item'
              rules={[{ required: true, type: Password, message: 'Please confirm your password' }]}
            >
              <Input.Password placeholder='Enter your password'/>
            </Item>


            <Item>
              <Button type="primary" htmlType="submit" className="login-btn">
                Create Account
              </Button>
            </Item>

            {/* <Item>
              <Button type="primary" 
                className="login-btn"
                icon={<FcGoogle />}
                onClick={() => window.location.href = 'URL_GOOGLE_AUTH'}
              >
                Sign up with Google
              </Button>
            </Item> */}

            <div className='login-link'>
              <span>Already have an account?</span>
              <Link className='login' to='/login'>Login</Link>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
