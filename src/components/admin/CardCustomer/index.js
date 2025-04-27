import React, { useState, useEffect } from 'react';
import { Table, Button, Popconfirm, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { FaBan } from "react-icons/fa6";
import { remove } from '../../../utils/requests';
import './CardCustomer.scss';

const CardCustomer = ({ filteredCustomers }) => {
  const token = useSelector((state) => state.auth.token);
  const [customers, setCustomers] = useState(filteredCustomers);

  useEffect(() => {
    setCustomers(filteredCustomers);
  }, [filteredCustomers]);

  const handleBanCustomer = async (id) => {
    try {
      const response = await remove(`users/me/${id}`, token); // Gọi API xoá user
  
      if (response && response.status) {
        message.success('Customer banned successfully!');
      } else {
        message.error('Failed to ban customer');
      }
    } catch (error) {
      console.error(error);
      message.error('An error occurred while banning the customer');
    }
    finally {
      const newCustomers = customers.filter(customer => customer.id !== id);
      setCustomers(newCustomers); // Cập nhật danh sách sau khi xoá
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'fullname',
      key: 'fullname',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <span>
          {/* <Button type="link" icon={<EditOutlined />} /> */}
          <Popconfirm
            title="Are you sure to ban this account?"
            onConfirm={() => handleBanCustomer(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger icon={<FaBan />} />
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div className="customer-management">
      <Table
        columns={columns}
        dataSource={customers} // Sử dụng filteredCustomers từ props
        pagination={{
          pageSize: 10,
          style: { alignItems: 'center', justifyContent: 'center' },
        }}
      />
    </div>
  );
};

export default CardCustomer;