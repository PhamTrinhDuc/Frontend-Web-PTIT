import { useState } from "react";
import useProductByDiscountDesc from "../../hook/useProductByDiscountDesc";
import FlashSale from "../FlashSale";
import { numPageProductHeader } from "../../utils/variable";
import Loading from "../Loading";

const FlashSaleSection = () => {
  const [page, setPage] = useState(1);
  const pageSize = numPageProductHeader;

  const { products, loading, error, totalPages } = useProductByDiscountDesc({page, pageSize});

  const handlePaginationChange = (newPage) => {
    setPage(newPage);
  };

  if (loading) return <Loading loading={loading} />;
  if (error) return <div>Error: {error}</div>;

  return (
    <FlashSale
      products={products}
      pageSize={pageSize}
      currentPage={page}
      totalPages={totalPages}
      loading={loading}
      onPaginationChange={handlePaginationChange}
    />
  );
};

export default FlashSaleSection;
