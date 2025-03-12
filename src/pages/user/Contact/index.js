import { Form, Input, Button,message, Col, Row } from "antd";
import { FaPhoneSquare } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import './Contact.scss';

const { TextArea } = Input;


// Khởi tạo form -> onFinish: nhận dữ liệu values từ form dưới dạng 1 bject -> Gửi dữ liệu về backend -> Xử lý kết quả trả về từ backend -> Hiển thị thông báo thành công hoặc lỗi tương ứng


function Contact() {
  const [form] = Form.useForm()
  const onFinish = async (values) => {
    console.log('Form values:', values);
    try {
      // Gửi dữ liệu về backend
      const response = await fetch.post('YOUR_BACKEND_API_URL', values);
      message.success('Message sent successfully!'); // Thông báo thành công
      form.resetFields(); // Xóa form sau khi gửi
    } catch (error) {
      console.error('Error sending message:', error);
      message.error('Failed to send message. Please try again.'); // Thông báo lỗi
    }
  };

  return (
    <>
      <Row gutter={[16, 16]} className="contact">

        <Col className="contact-content">
        <div className="call-us">
          <div className="call-us-title">
            <h2> <FaPhoneSquare/> Call To Us</h2>
          </div>
          <ul className="call-us-content">
            <li>We are available 24/7, 7 days a week.</li>
            <li>lihone: (+84) 123-456-789</li>
          </ul>

          <hr className="line"></hr>
          
          <div className="write-us">
            <h2 className="write-us-title"><IoMdMail/> Write Us</h2>
            <ul className="email-list">
              <li>Fill out our form and we will contact you within 24 hours.</li>
              <li><a href="#">Emails: customer@neocircuit.com</a></li>
              <li><a href="#">Emails: support@neocircuit.com</a></li>
            </ul>              
          </div>
        </div>
        </Col>

        <Col className="contact-form">
          <div className="contact-form-container">
            {/* form tổng thể */}
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              requiredMark={true}
            >
              {/* tạo 1 row chứa các form item */}
              <div className="form-row">
                {/* form nhập tên */}
                <Form.Item
                  name="name"
                  label="Your Name"
                  rules={[{ required: true, message: 'Please enter your name' }]}
                  className="form-item"
                >
                  <Input placeholder="Your Name" />
                </Form.Item>

                {/* form nhập email */}
                <Form.Item
                  name="email"
                  label="Your Email" 
                  rules={[{ required: true, message: 'Please enter your email' }]}
                  className="form-item"
                >
                  <Input placeholder="Your Email" />
                </Form.Item>

                {/* form nhập sđt */}
                <Form.Item
                  name="phone"
                  label="Your Phone"
                  rules={[{ required: true, message: 'Please enter your phone' }]}
                  className="form-item"
                >
                  <Input placeholder="Your Phone" />
                </Form.Item>
              </div>

              <Form.Item
                name="message"
                label="Your Message"
                rules={[{ required: true, message: 'Please enter your message' }]}
              >
                <TextArea rows={4} placeholder="Your Message" />
              </Form.Item>


              <Form.Item>
                <Button type="primary" htmlType="submit" className="send-message-btn">
                  Send Message
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>

      </Row>
    </>
  );
}

export default Contact;