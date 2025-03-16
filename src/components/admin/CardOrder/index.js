import React, { useState } from 'react';
import { Table, Button, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './CardOrder.scss';

const CardOrder = () => {
  // Dữ liệu mẫu
  const [orders, setOrders] = useState([
    {
      key: 1,
      OrderID: '#1',
      totalPrice: '13.000.000',
      customer: 'Phạm Trịnh Đức duc78240@gmail.com',
      paymentStatus: 'PAID V',
      date: '19-12-2025 10:45 AM',
      deliveryType: 'Standard Delivery',
    },
    {
      key: 2,
      OrderID: '#2',
      totalPrice: '13.000.000',
      customer: 'Phạm Trịnh Đức duc78240@gmail.com',
      paymentStatus: 'PAID V',
      date: '19-12-2025 10:45 AM',
      deliveryType: 'Standard Delivery',
    },
    {
      key: 3,
      OrderID: '#3',
      totalPrice: '13.000.000',
      customer: 'Phạm Trịnh Đức duc78240@gmail.com',
      paymentStatus: 'PAID V',
      date: '19-12-2025 10:45 AM',
      deliveryType: 'Standard Delivery',
    },
    {
      key: 4,
      OrderID: '#4',
      totalPrice: '13.000.000',
      customer: 'Phạm Trịnh Đức duc78240@gmail.com',
      paymentStatus: 'PAID V',
      date: '19-12-2025 10:45 AM',
      deliveryType: 'Standard Delivery',
    },
    {
      key: 5,
      OrderID: '#5',
      totalPrice: '13.000.000',
      customer: 'Phạm Trịnh Đức duc78240@gmail.com',
      paymentStatus: 'PAID V',
      date: '19-12-2025 10:45 AM',
      deliveryType: 'Standard Delivery',
    },
    {
      key: 6,
      OrderID: '#6',
      totalPrice: '13.000.000',
      customer: 'Phạm Trịnh Đức duc78240@gmail.com',
      paymentStatus: 'PAID V',
      date: '19-12-2025 10:45 AM',
      deliveryType: 'Standard Delivery',
    },
    {
      key: 7,
      OrderID: '#7',
      totalPrice: '13.000.000',
      customer: 'Phạm Trịnh Đức duc78240@gmail.com',
      paymentStatus: 'PAID V',
      date: '19-12-2025 10:45 AM',
      deliveryType: 'Standard Delivery',
    },
  ]);

  // Quản lý trạng thái chọn sản phẩm
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    columnTitle: '', // Bỏ checkbox ở header
  };

  // Xóa sản phẩm
  const handleDelete = (key) => {
    const newData = orders.filter(item => item.key !== key);
    setOrders(newData);
    message.success('Product deleted successfully!');
  };

  // Cột của bảng
  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'OrderID',
      key: 'OrderID',
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Payment Status',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Delivery Type',
      dataIndex: 'deliveryType',
      key: 'deliveryType',
    },
    // {
    //   title: 'Actions',
    //   key: 'actions',
    //   render: (_, record) => (
    //     <span>
    //       <Button type="link" icon={<EditOutlined />} />
    //       <Popconfirm
    //         title="Are you sure to delete this product?"
    //         onConfirm={() => handleDelete(record.key)}
    //         okText="Yes"
    //         cancelText="No"
    //       >
    //         <Button type="link" danger icon={<DeleteOutlined />} />
    //       </Popconfirm>
    //     </span>
    //   ),
    // },
  ];

  return (
    <div className="order-management">
      <Table
        columns={columns}
        dataSource={orders}
        rowSelection={rowSelection}
        pagination={{
          pageSize: 10,
          style: { alignItems: 'center', justifyContent: 'center' }, // Căn giữa và thêm margin
        }}
      // scroll={{ y: 400 }}
      />
    </div>
  );
};

export default CardOrder;