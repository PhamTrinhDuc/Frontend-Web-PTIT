import { post } from '../utils/requests';

/**
 * Service để xử lý thanh toán với bên thứ 3
 */
class PaymentService {
  /**
   * Tạo giao dịch thanh toán
   * @param {Object} paymentData - Dữ liệu thanh toán
   * @param {string} paymentData.amount - Số tiền
   * @param {string} paymentData.currency - Loại tiền tệ (VND, USD, etc.)
   * @param {string} paymentData.description - Mô tả giao dịch
   * @param {string} paymentData.paymentMethod - Phương thức thanh toán
   * @param {string} token - JWT token
   * @returns {Promise} Response từ server
   */
  async createPayment(paymentData, token) {
    try {
      const response = await post('payment/create', paymentData, token);
      return response;
    } catch (error) {
      console.error('Error creating payment:', error);
      throw error;
    }
  }

  /**
   * Xác nhận thanh toán
   * @param {string} paymentId - ID của giao dịch
   * @param {string} paymentToken - Token xác thực từ bên thứ 3
   * @param {string} authToken - JWT token
   * @returns {Promise} Response từ server
   */
  async confirmPayment(paymentId, paymentToken, authToken) {
    try {
      const response = await post(
        `payment/confirm?paymentId=${paymentId}&token=${paymentToken}`,
        null,
        authToken
      );
      return response;
    } catch (error) {
      console.error('Error confirming payment:', error);
      throw error;
    }
  }
}

export default new PaymentService();
