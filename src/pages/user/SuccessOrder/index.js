import { Button } from 'antd';
import './SuccessOrder.scss';

function SuccessOrder() {
  return (
    <div className="success-page">
      <h1 className="title">Đặt Hàng Thành Công!</h1>
      <p className="message">
        Cảm ơn bạn đã đặt hàng. Đơn hàng của bạn đã được ghi nhận. Chúng tôi sẽ liên hệ sớm nhất!
      </p>
      <Button className="back-home" type="ghost" href="/">
        Quay lại trang chủ
      </Button>
    </div>
  );
}

export default SuccessOrder;