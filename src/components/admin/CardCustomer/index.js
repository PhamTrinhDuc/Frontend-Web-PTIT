import React, { useState } from 'react';
import { Table, Button, Popconfirm, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { FaBan } from "react-icons/fa6";
import './CardCustomer.scss';

const CardCustomer = ({ filteredCustomers }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    columnTitle: '',
  };

  const handleBanCustomer = (key) => {
    const newCustomers = filteredCustomers.filter(customer => customer.key !== key);
    // Cập nhật danh sách sau khi xóa (có thể cần callback lên cha nếu muốn đồng bộ)
    message.success('Customer banned successfully!');
    // Nếu cần cập nhật lên ManageCustomer, bạn phải truyền setFilteredCustomers xuống đây
    return newCustomers;
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
        dataSource={filteredCustomers} // Sử dụng filteredCustomers từ props
        rowSelection={rowSelection}
        pagination={{
          pageSize: 10,
          style: { alignItems: 'center', justifyContent: 'center' },
        }}
      />
    </div>
  );
};

export default CardCustomer;