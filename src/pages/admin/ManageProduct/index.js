import { useState } from 'react';
import { useEffect } from 'react';
import CardProduct from '../../../components/admin/CardProduct';
import './ManageProduct.scss';
import HeaderMangeProduct from '../../../components/admin/HeaderManageProduct';
import useProductByCategory from '../../../hook/useProductsByCategory';
import { numPageProduct } from '../../../utils/variable';
import Loading from '../../../components/Loading';

function ManageProduct() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = numPageProduct;
  const [filters, setFilters] = useState({ priceRange: null, sortOption: null });
  const [category, setCategory] = useState(null);
  
  const { products: productsSearch, loading, error, refreshProduct } = useProductByCategory({ 
    categorySlug: category,
    page: page, 
    pageSize: pageSize, 
    priceRange: filters.priceRange,
    sortOption: filters.sortOption,
  });

  useEffect(() => {
    if (productsSearch) {
      setProducts(productsSearch);
    }
  }, [productsSearch]);

  const filterProductsByCategory = async (category) => {
    setCategory(category);
  };
  
  const handlePaginationChange = (newPage) => {
    setPage(newPage);
  };

  if (loading) return <Loading loading={loading} />;
  if (error) return <div>Lỗi: {error}</div>;

  return (
    <>
      <HeaderMangeProduct
        products={products}
        onFilterByCategory={filterProductsByCategory}
      />
      <div className="navigation-container">
        <div className="carousel-container">
          <CardProduct 
            products={products} 
            onPaginationChange={handlePaginationChange} 
            onRefresh={refreshProduct} 
          />
        </div>
      </div>
    </>
  );
}

export default ManageProduct;