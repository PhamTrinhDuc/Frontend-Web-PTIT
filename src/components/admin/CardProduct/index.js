import React, { useState } from 'react';
import { Table, Button, Popconfirm, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './CardProduct.scss';
import { remove } from '../../../utils/requests';
import { numPageProduct } from '../../../utils/variable';
import { useSelector } from 'react-redux';


const CardProduct = ({ products, onPaginationChange}) => {
  const navigate = useNavigate();
  const { token } = useSelector((state => state.auth));

  const handleDelete = async (id) => {
    const response = await remove(`products/${id}`, token);
    console.log("result: ", response)
    window.location.reload();
    if (!response) {
      throw new Error(response.message || 'Failed to delete product');
    }
  };

  const handlePaginationChange = (pagination) => {
    const { current, pageSize } = pagination;
    onPaginationChange?.(current);
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
        pagination={{
          pageSize: numPageProduct,
          style: { display: 'flex', justifyContent: 'center' },
        }}
        onChange={handlePaginationChange}
      />
    </div>
  );
};

export default CardProduct;