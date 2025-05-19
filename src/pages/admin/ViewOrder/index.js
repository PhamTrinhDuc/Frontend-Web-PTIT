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
  // Add sort state
  const [sortByDateDesc, setSortByDateDesc] = useState(true);

  const { orders, loading, error } = useAllOrder(
    isLoggedIn && user
      ? { currentPage, pageSize }
      : { skip: true }
  );

  // Sort orders by date function
  const sortOrdersByDate = (ordersToSort) => {
    if (!ordersToSort || !Array.isArray(ordersToSort)) return [];
    
    return [...ordersToSort].sort((a, b) => {
      const dateA = new Date(a.orderDate);
      const dateB = new Date(b.orderDate);
      return sortByDateDesc ? dateB - dateA : dateA - dateB;
    });
  };

  // Toggle sort order
  const toggleSortOrder = () => {
    setSortByDateDesc(prev => !prev);
    // Re-sort the orders based on new sort direction
    setOrders(prev => sortOrdersByDate(prev));
  };

  const handlePaginationChange = (newPage) => {
    setCurrentPage(newPage);
  };
  React.useEffect(() => {
    if (orders) {
      // Apply sorting to orders
      const sortedOrders = sortOrdersByDate(orders);
      setOrders(sortedOrders);
    }
  }, [orders, sortByDateDesc]);

  if (loading) return <Loading loading={loading} />;
  if (error) {
    navigate('/error');
    return null;
  }

  // Hàm lọc đơn hàng theo trạng thái
  const filterOrdersByStatus = (status) => {
    if (status === 'ALL') {
      // Apply sorting when resetting to all orders
      setOrders(sortOrdersByDate(orders));
      return;
    }
    const filteredOrders = orders.filter((order) => order.status === status.toUpperCase());
    
    // Apply sorting to filtered orders
    setOrders(sortOrdersByDate(filteredOrders));
  };
  return (
    <>
      <HeaderManageOrder 
        orders={orders} 
        onFilterByStatus={filterOrdersByStatus} 
        onToggleSort={toggleSortOrder}
        sortByDateDesc={sortByDateDesc}
      />
      <CardOrder orders={allOrders} onPaginationChange = {handlePaginationChange}/>
    </>
  );
}

export default ViewOrder;