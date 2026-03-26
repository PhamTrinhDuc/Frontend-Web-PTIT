import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './FlashSale.scss';
import useProductByDiscountDesc from '../../hook/useProductByDiscountDesc';
import CountdownTimer from './CountdownTimer';
import PanigationProduct from '../PanigationProduct';
import { numPageProductHeader } from '../../utils/variable';
import Loading from '../../components/Loading';

function FlashSale({ products, pageSize, currentPage, totalPages, loading, onPaginationChange }) {

  return (
    <>
      <div className='flash-sale'>
        <CountdownTimer />
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