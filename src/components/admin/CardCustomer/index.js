import React, { useState, useEffect } from 'react';
import { Table, Button, Popconfirm, message, Tag, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { FaBan } from "react-icons/fa6";
import { remove } from '../../../utils/requests';
import './CardCustomer.scss';

const CardCustomer = ({ filteredCustomers, onRefresh }) => {
  const token = useSelector((state) => state.auth.token);
  const [customers, setCustomers] = useState(filteredCustomers);

  useEffect(() => {
    setCustomers(filteredCustomers);
  }, [filteredCustomers]);

  const handleBanCustomer = async (id) => {
    try {
      const response = await remove(`users/me/${id}`, token);
  
      if (response) {
        message.success('Account modified successfully!');
        if (onRefresh) {
          onRefresh();
        } else {
          setCustomers(prev => prev.filter(c => c.id !== id));
        }
      } else {
        message.error('Failed to update account');
      }
    } catch (error) {
      console.error(error);
      message.error('An error occurred during the operation');
    }
  };

  const columns = [
    {
      title: 'User',
      key: 'user',
      render: (_, record) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar src={record.avatar} icon={<UserOutlined />} style={{ marginRight: 8 }} />
          <div>
            <div style={{ fontWeight: 'bold' }}>{record.fullname || 'No Name'}</div>
            <div style={{ fontSize: '12px', color: '#999' }}>@{record.username}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <Tag color={role === 'ADMIN' ? 'volcano' : 'blue'}>
          {role?.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Phone',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'ACTIVE' ? 'green' : 'red'}>
          {status || 'ACTIVE'}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <span>
          <Popconfirm
            title="Are you sure to deactivate this account?"
            onConfirm={() => handleBanCustomer(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger icon={<FaBan />} disabled={record.role === 'ADMIN'} />
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div className="customer-management">
      <Table
        columns={columns}
        dataSource={customers}
        pagination={{
          pageSize: 10,
          style: { display: 'flex', justifyContent: 'center' },
        }}
        rowKey="id"
      />
    </div>
  );
};

export default CardCustomer;