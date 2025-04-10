import React, { useState, useEffect} from 'react';
import { Button } from 'antd';
import { CiFilter } from "react-icons/ci";
import { TiExportOutline } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';
import { Dropdown, Input, Menu } from 'antd';
import axios from 'axios';
import * as XLSX from 'xlsx';
import './HeaderManageCustomer.scss'

function HeaderManageCustomer() {       
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]); // Danh sách khách hàng từ API
  const [filteredCustomers, setFilteredCustomers] = useState([]); // Danh sách đã lọc/tìm kiếm
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // Giá trị tìm kiếm

  // Gọi API để lấy danh sách khách hàng
  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      try {
        const response = await axios.get('YOUR_API_ENDPOINT/customers'); // Thay bằng endpoint API của bạn
        setCustomers(response.data);
        setFilteredCustomers(response.data); // Khởi tạo danh sách đã lọc
      } catch (error) {
        console.error('Error fetching customers:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  // Hàm lọc và sắp xếp khách hàng
  const handleFilter = (sortBy) => {
    let sortedCustomers = [...filteredCustomers];
    if (sortBy === 'nameDesc') {
      sortedCustomers.sort((a, b) => b.name.localeCompare(a.name)); // Sắp xếp tên giảm dần
    } else if (sortBy === 'orders') {
      sortedCustomers.sort((a, b) => (b.orderCount || 0) - (a.orderCount || 0)); // Sắp xếp theo số đơn hàng
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
    const filtered = customers.filter((customer) =>
      customer.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCustomers(filtered);
  };

  // Hàm xuất file Excel
  const handleExport = () => {
    const data = filteredCustomers.map((customer) => ({
      ID: customer.id,
      Name: customer.name,
      'Order Count': customer.orderCount || 0,
      // Thêm các trường khác nếu cần
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