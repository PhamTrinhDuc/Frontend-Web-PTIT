import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardOrder from '../../../components/admin/CardOrder';
import useAllOrder from '../../../hook/useAllOrder';
import Loading from '../../../components/Loading';
import HeaderManageOrder from '../../../components/admin/HeaderManageOrder';
import { numPageProduct } from '../../../utils/variable';
import './ViewOrder.scss';


function ViewOrder() {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const [allOrders, setOrders] = useState([]);
  const pageSize = numPageProduct;
  const [currentPage, setCurrentPage] = useState(1);

  const { orders, loading, error } = useAllOrder(
    isLoggedIn && user
      ? { currentPage, pageSize }
      : { skip: true }
  );


  const handlePaginationChange = (newPage) => {
    setCurrentPage(newPage);
  };

  React.useEffect(() => {
    if (orders) {
      setOrders(orders);
    }
  }, [orders]);

  if (loading) return <Loading loading={loading} />;
  if (error) {
    navigate('/error');
    return null;
  }

  // Hàm lọc đơn hàng theo trạng thái
  const filterOrdersByStatus = (status) => {
    if (status === 'ALL') {
      setOrders(orders);
      return;
    }
    const filteredOrders = orders.filter((order) => order.status === status.toUpperCase());
    setOrders(filteredOrders);
  };

  return (
    <>
      <HeaderManageOrder orders={orders} onFilterByStatus={filterOrdersByStatus}/>
      <CardOrder orders={allOrders} onPaginationChange = {handlePaginationChange}/>
    </>
  );
}

export default ViewOrder;