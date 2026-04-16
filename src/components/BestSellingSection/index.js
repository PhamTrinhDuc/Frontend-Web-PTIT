import { useState } from "react";
import useAllProduct from "../../hook/useAllProduct";
import BestSellingBanner from "../BestSellingBanner";
import { numPageProductHeader } from "../../utils/variable";
import Loading from "../Loading";

const BestSellingSection = () => {
  const [page, setPage] = useState(1);
  const pageSize = numPageProductHeader;
  // const pageSize = 8;

  const { products, totalPages, loading, error } = useAllProduct({ page, pageSize });

  const handlePaginationChange = (newPage) => {
    setPage(newPage);
  };

  if (loading) return <Loading loading={loading} />;
  if (error) return <div>Error: {error}</div>;

  return (
    <BestSellingBanner
      products={products}
      pageSize={pageSize}
      currentPage={page}
      totalPages={totalPages}
      loading={loading}
      onPaginationChange={handlePaginationChange}
    />
  );
};

export default BestSellingSection;
