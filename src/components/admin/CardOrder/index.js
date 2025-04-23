import React, { useState } from 'react';
import { Table, Button, Alert, message, Select } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import useAllOrder from '../../../hook/useAllOrder';
import { put } from '../../../utils/requests';

import './CardOrder.scss';

const { Option } = Select;

const CardOrder = ({orders, onPaginationChange}) => {
  const [showAlert, setShowAlert] = useState(false);
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  // Chuyển orderHistory thành state để cập nhật cục bộ
  const [orderHistory, setOrderHistory] = useState(
    orders.flatMap((order) =>
      order.items.map((item) => ({
        orderId: order.id,
        customer: user.fullname,
        product: item.productName,
        price: item.unitPrice * item.quantity,
        status: order.status,
        date: order.orderDate,
        paymentMethod: order.paymentMethod.toUpperCase(),
      }))
    )
  );

  // Cập nhật orderHistory khi orders thay đổi (từ API)
  React.useEffect(() => {
    setOrderHistory(
      orders.flatMap((order) =>
        order.items.map((item) => ({
          orderId: order.id,
          customer: user.fullname,
          product: item.productName,
          price: item.unitPrice * item.quantity,
          status: order.status,
          date: order.orderDate,
          paymentMethod: order.paymentMethod.toUpperCase(),
        }))
      )
    );
  }, [orders, user.fullname]);

  const handlePaginationChange = (pagination) => {
    const { current, pageSize } = pagination;
    onPaginationChange?.(current);
  };

  // Hàm xử lý thay đổi trạng thái
  const handleStatusChange = async (value, record) => {
    try {
      const response = await put(`orders/update/${record.orderId}`, {
        status: value.toUpperCase(),
      });

      if (response) {
        // Cập nhật trạng thái cục bộ trong orderHistory
        setOrderHistory((prev) =>
          prev.map((item) =>
            item.orderId === record.orderId
              ? { ...item, status: value.toUpperCase() }
              : item
          )
        );

        // Hiển thị thông báo thành công
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 1500);

        // Tùy chọn: Gọi refetch nếu cần đồng bộ dữ liệu từ server
        // refetch();
      } else {
        throw new Error('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      message.error('Failed to update status');
    }
  };

  // Cột của bảng
  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'orderId',
      key: 'orderId',
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: 'Total Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Payment Status',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => (
        <Select
          value={status}
          style={{ width: 110, height: 25 }}
          onChange={(value) => handleStatusChange(value, record)}
          onClick={(e) => e.stopPropagation()}
        >
          <Option value="pending">Pending</Option>
          <Option value="processing">Processing</Option>
          <Option value="shipped">Shipped</Option>
          <Option value="delivered">Delivered</Option>
          <Option value="cancelled">Cancelled</Option>
        </Select>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Delivery Type',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
    },
  ];

  return (
    <>
      {showAlert && (
        <Alert
          message={'Status has been updated successfully!'}
          type="success"
          showIcon
          className="alert"
        />
      )}
      <div className="order-management">
        <Table
          columns={columns}
          dataSource={orderHistory}
          pagination={{
            pageSize: 10,
            style: { alignItems: 'center', justifyContent: 'center' },
          }}
          onChange={handlePaginationChange}
        />
      </div>
    </>
  );
};

export default CardOrder;