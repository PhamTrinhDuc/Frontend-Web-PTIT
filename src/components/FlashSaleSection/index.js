import { useState, useEffect } from "react";
import FlashSale from "../FlashSale";
import { numPageProductHeader } from "../../utils/variable";
import Loading from "../Loading";
import { get } from "../../utils/requests";

const FlashSaleSection = () => {
  const [page, setPage] = useState(1);
  const pageSize = numPageProductHeader;
  const [activeSale, setActiveSale] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchActiveSale = async () => {
      setLoading(true);
      try {
        const response = await get('flashsales/active');
        if (response) {
          setActiveSale(response);
        }
      } catch (err) {
        console.error('Failed to fetch active flash sale:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchActiveSale();
  }, []);

  const handlePaginationChange = (newPage) => {
    setPage(newPage);
  };

  if (loading) return <Loading loading={loading} />;
  
  if (!activeSale) return null;

  const products = activeSale.products || [];
  const paginatedProducts = products.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(products.length / pageSize);

  return (
    <FlashSale
      title={activeSale.title}
      endDate={activeSale.endDate}
      products={paginatedProducts}
      pageSize={pageSize}
      currentPage={page}
      totalPages={totalPages}
      loading={loading}
      onPaginationChange={handlePaginationChange}
    />
  );
};

export default FlashSaleSection;
