import { Table, Button, Popconfirm, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './CardProduct.scss';
import { remove } from '../../../utils/requests';
import { numPageProduct } from '../../../utils/variable';
import { useSelector } from 'react-redux';


const CardProduct = ({ products, onPaginationChange, onRefresh }) => {
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);

  const handleDelete = async (id) => {
    try {
      const response = await remove(`products/${id}`, token);
      if (response && response.status) {
        message.success('Product deleted successfully');
        onRefresh?.(); // Gọi callback để refresh danh sách
      } else {
        message.error(response?.message || 'Failed to delete product');
      }
    } catch (error) {
      message.error('An error occurred while deleting the product');
      console.error(error);
    }
  };

  const handlePaginationChange = (pagination) => {
    const { current, pageSize } = pagination;
    onPaginationChange?.(current);
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'imagePaths',
      key: 'image',
      render: (images) => (
        <img src={images && images.length > 0 ? images[0] : ''} alt="product" style={{ width: 50, height: 50, borderRadius: 4, objectFit: 'cover' }} />
      ),
    },
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