import React, { useState } from 'react';
import { Table, Button, Popconfirm, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './CardProduct.scss';

const mock_data = [
  {
    id: '1',
    productName: 'iPhone 13 pro max - Pacific Blue-128GB',
    price: '13,000,000',
    category: 'Phone',
    publishDate: '19-12-2025 10:45 AM',
  },
  {
    id: '2',
    productName: 'iPhone 13 pro max - Pacific Blue-128GB',
    price: '13,000,000',
    category: 'Phone',
    publishDate: '19-12-2025 10:45 AM',
  },
  {
    id: '3',
    productName: 'iPhone 13 pro max - Pacific Blue-128GB',
    price: '13,000,000',
    category: 'Phone',
    publishDate: '19-12-2025 10:45 AM',
  },
  {
    id: '4',
    productName: 'iPhone 13 pro max - Pacific Blue-128GB',
    price: '13,000,000',
    category: 'Phone',
    publishDate: '19-12-2025 10:45 AM',
  },
  {
    id: '5',
    productName: 'iPhone 13 pro max - Pacific Blue-128GB',
    price: '13,000,000',
    category: 'Phone',
    publishDate: '19-12-2025 10:45 AM',
  },
  {
    id: '6',
    productName: 'iPhone 13 pro max - Pacific Blue-128GB',
    price: '13,000,000',
    category: 'Phone',
    publishDate: '19-12-2025 10:45 AM',
  },
  {
    id: '7',
    productName: 'iPhone 13 pro max - Pacific Blue-128GB',
    price: '13,000,000',
    category: 'Phone',
    publishDate: '19-12-2025 10:45 AM',
  },
]

const CardProduct = () => {
  // Dữ liệu mẫu
  const [products, setProducts] = useState(mock_data);
  // Quản lý trạng thái chọn sản phẩm
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const navigate = useNavigate();

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
    const newData = products.filter(item => item.key !== key);
    setProducts(newData);
    message.success('Product deleted successfully!');
  };

  // Cột của bảng
const columns = [
  {
    title: 'Product name',
    dataIndex: 'productName',
    key: 'productName',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: 'Publish on',
    dataIndex: 'publishDate',
    key: 'publishDate',
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (_, record) => (
      <span>
        <Button type="link" icon={<EditOutlined />} 
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
          style: { alignItems: 'center', justifyContent: 'center' }, // Căn giữa và thêm margin
        }}
        // scroll={{ y: 400 }}
      />
    </div>
  );
};

export default CardProduct;