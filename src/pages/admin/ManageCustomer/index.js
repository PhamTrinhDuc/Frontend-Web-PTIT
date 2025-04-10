import React, { useState } from 'react';
import CardCustomer from '../../../components/admin/CardCustomer';
import HeaderManageCustomer from '../../../components/admin/HeaderManageCustomer';

function ManageCustomer() {
  const [filteredCustomers, setFilteredCustomers] = useState([]); // Danh sách khách hàng đã lọc
  const [searchTerm, setSearchTerm] = useState(''); // Giá trị tìm kiếm

  return (
    <div>
      <HeaderManageCustomer
        filteredCustomers={filteredCustomers}
        setFilteredCustomers={setFilteredCustomers}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <CardCustomer filteredCustomers={filteredCustomers} />
    </div>
  );
}

export default ManageCustomer;