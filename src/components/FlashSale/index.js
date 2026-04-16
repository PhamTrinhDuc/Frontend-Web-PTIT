import './FlashSale.scss';
import CountdownTimer from './CountdownTimer';
import PanigationProduct from '../PanigationProduct';

function FlashSale({ title, endDate, products, pageSize, currentPage, totalPages, loading, onPaginationChange }) {

  return (
    <>
      <div className='flash-sale'>
        <CountdownTimer title={title} endDate={endDate} />
        <PanigationProduct
          products={products}
          pageSize={pageSize}
          totalPages={totalPages}
          currentPage={currentPage}
          loading={loading}
          onPageChange={(currentPage) => onPaginationChange(currentPage, pageSize)}
        />
      </div>
    </>
  );
}

export default FlashSale;