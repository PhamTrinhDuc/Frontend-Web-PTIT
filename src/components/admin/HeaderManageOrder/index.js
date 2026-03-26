import { Button, Menu, Dropdown, Tooltip } from 'antd';
import { CiFilter } from "react-icons/ci";
import { TiExportOutline } from "react-icons/ti";
import { BiSortDown, BiSortUp } from "react-icons/bi";
import * as XLSX from 'xlsx';
import './HeaderManageOrder.scss'

function HeaderManageOrder({orders, onFilterByStatus, onToggleSort, sortByDateDesc}) {

  const filterMenu = (
    <Menu
      onClick={(e) => onFilterByStatus(e.key)}
      items={[
        {
          key: 'ALL',
          label: 'All',
        },
        {
          key: 'completed',
          label: 'Completed',
        },
        {
          key: 'cancelled',
          label: 'Cancelled',
        },
        {
          key: 'pending',
          label: 'Pending',
        },
        {
          key: 'processing',
          label: 'Processing',
        },
      ]}
    />
  );
  // Hàm xuất file Excel
  const handleExport = () => {
    const data = orders.map((order) => ({
      ID: order.id,
      Date: order.orderDate,
      Customer: order.customerName || 'N/A',
      Status: order.status,
      Total: order.totalAmount,
      PaymentMethod: order.paymentMethod || 'N/A',
      Items: (order.items || []).length
    }));
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');
    XLSX.writeFile(workbook, 'orders.xlsx');
  };
  return (
    <div className='header-manage'>
        <h2>View Order</h2>
        <div className='button-manage'>
          <Tooltip title={sortByDateDesc ? "Sorting: Newest First" : "Sorting: Oldest First"}>
            <Button 
              type="primary" 
              icon={sortByDateDesc ? <BiSortDown /> : <BiSortUp />} 
              className="button-icon"
              onClick={onToggleSort}
            >
              SORT BY DATE
            </Button>
          </Tooltip>
          <Dropdown overlay={filterMenu} trigger={['click']}>
            <Button type="primary" icon={<CiFilter />} className="button-icon">
              FILTER
            </Button>
          </Dropdown>
          <Button
            type="primary"
            icon={<TiExportOutline />}
            className="button-icon"
            onClick={handleExport}
          >
            EXPORT
          </Button>
        </div>
      </div>
  );
}

export default HeaderManageOrder;