# Hướng Dẫn Tích Hợp Thanh Toán với Bên Thứ Ba

## 📋 Tổng Quan

Hệ thống thanh toán đã được tích hợp với các file sau:
- **Service**: `src/services/paymentService.js` - Xử lý API calls
- **Transaction Page**: `src/pages/user/Transaction/index.js` - Giao diện thanh toán
- **Success Page**: `src/pages/user/Transaction/PaymentSuccess.js` - Trang thành công
- **Styles**: `src/pages/user/Transaction/Transaction.scss` - Styles

## 🔧 Cấu Hình Backend API

API endpoint được cấu hình trong `src/utils/requests.js`:
```javascript
const API_DOMAIN = "http://localhost:8080/api";
```

### Endpoints sử dụng:
1. **POST** `/payment/create` - Tạo giao dịch thanh toán
2. **POST** `/payment/confirm?paymentId={id}&token={token}` - Xác nhận thanh toán

## 🚀 Cách Sử Dụng

### 1. Từ trang Cart/Billing chuyển sang Transaction

Cập nhật file `src/pages/user/Cart/index.js` hoặc `src/pages/user/Billing/index.js`:

```javascript
// Trong component CartSummary hoặc Billing
const handlePay = () => {
  if (selectedItems.length === 0) {
    onEmptyCart();
    return;
  }
  
  // Chuyển đến trang thanh toán
  navigate('/transaction', { 
    state: { 
      totalAmount: cartTotal,
      orderData: {
        items: selectedItems,
        // Thêm các thông tin khác nếu cần
      }
    } 
  });
};
```

### 2. Từ trang Billing (nếu có)

```javascript
// Trong src/pages/user/Billing/index.js
import { useNavigate } from 'react-router-dom';

const Billing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const { cartTotal, selectedItems } = location.state || {};

  const handleConfirmOrder = () => {
    // Tính tổng tiền
    const totalAmount = cartTotal; // hoặc tính toán lại nếu cần
    
    // Chuyển đến trang thanh toán
    navigate('/transaction', {
      state: {
        totalAmount: totalAmount,
        orderData: {
          items: selectedItems,
          shippingAddress: formData.address,
          customerInfo: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
          }
        }
      }
    });
  };

  return (
    // JSX của trang billing
    <Button onClick={handleConfirmOrder}>
      Xác nhận và thanh toán
    </Button>
  );
};
```

## 📝 Flow Thanh Toán

```
1. User chọn sản phẩm trong Cart
   ↓
2. User nhấn "Process to checkout" → Chuyển đến /billing
   ↓
3. User nhập thông tin giao hàng tại Billing
   ↓
4. User nhấn "Thanh toán" → Chuyển đến /transaction
   ↓
5. User chọn phương thức thanh toán và nhấn "Thanh toán"
   ↓
6. Hệ thống gọi API /payment/create
   ↓
7. Backend trả về paymentUrl → Redirect đến Payment Gateway
   ↓
8. User thanh toán tại Payment Gateway (VNPay, MoMo, etc.)
   ↓
9. Payment Gateway redirect về /transaction?paymentId=xxx&token=xxx
   ↓
10. Hệ thống tự động gọi API /payment/confirm
   ↓
11. Hiển thị kết quả thanh toán (thành công/thất bại)
```

## 🎨 Các Phương Thức Thanh Toán Hỗ Trợ

- **VNPay** - Ví điện tử VNPay
- **MoMo** - Ví điện tử MoMo
- **ZaloPay** - Ví điện tử ZaloPay
- **Bank Transfer** - Chuyển khoản ngân hàng
- **Credit Card** - Thẻ tín dụng/Ghi nợ

## 🔐 Xác Thực

Tất cả API calls đều yêu cầu JWT token từ Redux store:
```javascript
const { token } = useSelector((state) => state.auth);
```

Token được tự động thêm vào header qua `paymentService.js`.

## 📦 Response Format

### Create Payment Response
```json
{
  "success": true,
  "paymentId": "PAY_123456789",
  "paymentUrl": "https://payment-gateway.com/pay?token=xxx",
  "amount": "500000",
  "currency": "VND"
}
```

### Confirm Payment Response
```json
{
  "success": true,
  "paymentId": "PAY_123456789",
  "orderId": "ORD_123456789",
  "amount": "500000",
  "status": "COMPLETED",
  "transactionId": "TXN_123456789"
}
```

## ⚠️ Lưu Ý

1. **Route đã được thêm**: `/transaction` đã được thêm vào `PrivateRoute` (yêu cầu đăng nhập)

2. **Xử lý callback**: Component tự động xử lý URL params `paymentId` và `token` khi redirect về

3. **Error handling**: Tất cả lỗi đều được hiển thị bằng Alert component

4. **Loading states**: Có loading indicator khi đang xử lý thanh toán

## 🎯 Tùy Chỉnh

### Thay đổi Payment Gateway URL
Nếu backend trả về format khác, cập nhật trong `Transaction/index.js`:

```javascript
const handleCreatePayment = async (values) => {
  // ...
  const response = await paymentService.createPayment(paymentData, token);
  
  // Tùy chỉnh theo response của bạn
  if (response.data?.paymentUrl) {
    window.location.href = response.data.paymentUrl;
  }
};
```

### Thêm phương thức thanh toán mới
Cập nhật trong form select:

```javascript
<Select>
  <Option value="NEW_METHOD">
    <Icon /> Phương thức mới
  </Option>
</Select>
```

## 🧪 Test

### Test tạo payment:
1. Đăng nhập vào hệ thống
2. Thêm sản phẩm vào giỏ hàng
3. Chuyển đến `/transaction`
4. Chọn phương thức thanh toán và submit

### Test callback:
Truy cập URL: `/transaction?paymentId=TEST123&token=TESTTOKEN`

## 📞 Liên Hệ

Nếu cần hỗ trợ thêm, vui lòng liên hệ team backend để đảm bảo API endpoints hoạt động đúng.
