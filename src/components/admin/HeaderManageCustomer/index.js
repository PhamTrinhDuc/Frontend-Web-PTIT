import React, { useEffect } from 'react';
import { Button } from 'antd';
import { CiFilter } from "react-icons/ci";
import { TiExportOutline } from "react-icons/ti";
import { Dropdown, Input, Menu } from 'antd';
import useAllUsers from '../../../hook/useAllUsers'; // Sửa typo: userAllUsers -> useAllUsers
import * as XLSX from 'xlsx';
import './HeaderManageCustomer.scss';

function HeaderManageCustomer({ filteredCustomers, setFilteredCustomers, searchTerm, setSearchTerm }) {
  const { users, loading, error } = useAllUsers();

  // Cập nhật filteredCustomers khi users từ API thay đổi
  useEffect(() => {
    if (users && users.length > 0) {
      setFilteredCustomers(users); // Khởi tạo danh sách ban đầu từ API
    }
  }, [users, setFilteredCustomers]);

  // Hàm lọc và sắp xếp khách hàng
  const handleFilter = (sortBy) => {
    let sortedCustomers = [...filteredCustomers];
    if (sortBy === 'nameDesc') {
      sortedCustomers.sort((a, b) => b.fullname.localeCompare(a.fullname));
    } else if (sortBy === 'orders') {
      sortedCustomers.sort((a, b) => (b.orderCount || 0) - (a.orderCount || 0));
    }
    setFilteredCustomers(sortedCustomers);
  };

  // Menu cho Dropdown FILTER
  const filterMenu = (
    <Menu>
      <Menu.Item key="nameDesc" onClick={() => handleFilter('nameDesc')}>
        Sort by Name (Z-A)
      </Menu.Item>
      <Menu.Item key="orders" onClick={() => handleFilter('orders')}>
        Sort by Order Count
      </Menu.Item>
    </Menu>
  );

  // Hàm tìm kiếm khách hàng theo tên
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    const filtered = users.filter((customer) =>
      customer.fullname.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCustomers(filtered);
  };

  // Hàm xuất file Excel
  const handleExport = () => {
    const data = filteredCustomers.map((customer) => ({
      ID: customer.id,
      Name: customer.fullname,
      'Order Count': customer.orderCount || 0,
    }));
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Customers');
    XLSX.writeFile(workbook, 'customers.xlsx');
  };

  return (
    <div className="header-manage">
      <h2>Manage Customer</h2>

      <div className="button-manage">
        {/* Thanh tìm kiếm */}
        <Input
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearch}
          style={{ width: 200, marginRight: 8 }}
        />

        {/* Nút Filter */}
        <Dropdown overlay={filterMenu} trigger={['click']}>
          <Button type="primary" icon={<CiFilter />} className="button-icon">
            FILTER
          </Button>
        </Dropdown>

        {/* Nút Export */}
        <Button
          type="primary"
          icon={<TiExportOutline />}
          className="button-icon"
          onClick={handleExport}
          disabled={loading || filteredCustomers.length === 0}
        >
          EXPORT
        </Button>
      </div>
    </div>
  );
}

export default HeaderManageCustomer;