import React, { useState } from 'react';
import { Table, Button, Popconfirm, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { FaBan } from "react-icons/fa6";

import './CardCustomer.scss';


const initialCustomers = [
  {
    key: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    address: '123 Main St, Anytown, USA',
  },
  {
    key: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '987-654-3210',
    address: '456 Elm St, Othertown, USA',
  },
  // Add more customers as needed
];


const CardCustomer = () => {
  const [customers, setCustomers] = useState(initialCustomers);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    columnTitle: '', // Bỏ checkbox ở header
  };

  const handleBanCustomer = (key) => {
    const newCustomers = customers.filter(customer => customer.key !== key);
    setCustomers(newCustomers);
    message.success('Customer ban successfully!');
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
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
          <Button type="link" icon={<EditOutlined />} />
          <Popconfirm
            title="Are you sure to ban this account?"
            onConfirm={() => handleBanCustomer(record.key)}
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
        dataSource={customers}
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

export default CardCustomer;