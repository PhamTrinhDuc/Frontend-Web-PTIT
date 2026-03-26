import React from 'react';
import { useState, useMemo } from 'react';
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
  const pageSize = numPageProduct;
  const [currentPage, setCurrentPage] = useState(1);
  const [sortByDateDesc, setSortByDateDesc] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');

  const { orders, loading, error, fetchOrders } = useAllOrder(
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

  const displayedOrders = useMemo(() => {
    let result = orders || [];
    
    if (statusFilter !== 'ALL') {
      result = result.filter((order) => order.status === statusFilter.toUpperCase());
    }
    
    return sortOrdersByDate(result);
  }, [orders, sortByDateDesc, statusFilter]);
    
  // Toggle sort order
  const toggleSortOrder = () => {
    setSortByDateDesc(prev => !prev);
  };

  const handlePaginationChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (loading) return <Loading loading={loading} />;
  if (error) {
    navigate('/error');
    return null;
  }

  // Hàm lọc đơn hàng theo trạng thái
  const filterOrdersByStatus = (status) => {
    setStatusFilter(status);
  };
  return (
    <>
      <HeaderManageOrder 
        orders={orders} 
        onFilterByStatus={filterOrdersByStatus} 
        onToggleSort={toggleSortOrder}
        sortByDateDesc={sortByDateDesc}
      />
      <CardOrder 
        orders={displayedOrders} 
        onPaginationChange={handlePaginationChange}
        onRefresh={fetchOrders}
      />
    </>
  );
}

export default ViewOrder;