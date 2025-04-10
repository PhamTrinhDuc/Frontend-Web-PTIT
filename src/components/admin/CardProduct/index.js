import React, { useState } from 'react';
import { Table, Button, Popconfirm, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './CardProduct.scss';

const CardProduct = ({ products }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const navigate = useNavigate();

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    columnTitle: '',
  };

  const handleDelete = (id) => {
    // Logic xóa có thể truyền callback lên ManageProduct nếu cần cập nhật danh sách chính
    const newData = products.filter((item) => item.id !== id);
    message.success('Product deleted successfully!');
    return newData; // Trả về danh sách mới nếu cần
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Dicount',
      dataIndex: 'discount',
      key: 'discount',
    },
    {
      title: 'Quantity Stock',
      dataIndex: 'quantityStock',
      key: 'quantityStock',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <span>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => navigate(`/admin/edit-product/${record.id}`)}
          />
          <Popconfirm
            title="Are you sure to delete this product?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div className="product-management">
      <Table
        columns={columns}
        dataSource={products}
        rowSelection={rowSelection}
        pagination={{
          pageSize: 10,
          style: { alignItems: 'center', justifyContent: 'center' },
        }}
      />
    </div>
  );
};

export default CardProduct;