import React, { useState, useMemo } from 'react';
import { Table, Button, Alert, message, Select } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { put } from '../../../utils/requests';

import './CardOrder.scss';

const { Option } = Select;

const CardOrder = ({orders, onPaginationChange, onRefresh}) => {
  const [statusChanges, setStatusChanges] = useState({});
  const { token } = useSelector((state) => state.auth);

  // Map orders for Table display
  const tableData = useMemo(() => {
    if (!Array.isArray(orders)) return [];
    
    return orders.map((order) => ({
      key: order.id,
      orderId: order.id,
      customer: order.userName || 'Unknown User',
      productCount: order.items?.length || 0,
      totalPrice: order.items?.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0) || 0,
      status: statusChanges[order.id] || order.status,
      date: order.orderDate,
      paymentMethod: order.paymentMethod.toUpperCase(),
      items: order.items || [],
    }));
  }, [orders, statusChanges]);

  const handlePaginationChange = (pagination) => {
    const { current } = pagination;
    onPaginationChange?.(current);
  };

  const handleStatusChange = async (value, record) => {
    try {
      const response = await put(`orders/update/${record.orderId}`, {
        status: value.toUpperCase()
      }, token);

      if (response) {
        setStatusChanges((prev) => ({
          ...prev,
          [record.orderId]: value.toUpperCase()
        }));
        message.success(`Order #${record.orderId} updated to ${value.toUpperCase()}`);
        onRefresh?.();
      }
    } catch (error) {
      console.error('Error updating status:', error);
      message.error('Failed to update status');
    }
  };

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'orderId',
      key: 'orderId',
      width: 100,
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Items',
      dataIndex: 'productCount',
      key: 'items',
      render: (count) => `${count} items`,
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (val) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => (
        <Select
          value={status.toLowerCase()}
          style={{ width: 120 }}
          onChange={(value) => handleStatusChange(value, record)}
          status={status === 'CANCELLED' ? 'error' : (status === 'COMPLETED' ? 'success' : 'warning')}
        >
          <Option value="pending">Pending</Option>
          <Option value="processing">Processing</Option>
          <Option value="shipped">Shipped</Option>
          <Option value="completed">Completed</Option>
          <Option value="cancelled">Cancelled</Option>
        </Select>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Payment',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
    },
  ];

  return (
    <div className="order-management">
      <Table
        columns={columns}
        dataSource={tableData}
        expandable={{
          expandedRowRender: record => (
            <div style={{ padding: '0 50px' }}>
              <p>Items details:</p>
              <ul>
                {record.items.map((item, idx) => (
                  <li key={idx}>
                    <strong>{item.productName}</strong> - {item.quantity} x {new Intl.NumberFormat('vi-VN').format(item.unitPrice)}
                  </li>
                ))}
              </ul>
            </div>
          ),
          rowExpandable: record => record.items.length > 0,
        }}
        pagination={{
          pageSize: 10,
          style: { display: 'flex', justifyContent: 'center' },
        }}
        onChange={handlePaginationChange}
      />
    </div>
  );
};

export default CardOrder;