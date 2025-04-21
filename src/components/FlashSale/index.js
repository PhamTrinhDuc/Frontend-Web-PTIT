
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FlashSale.scss';
import useProductByDiscountDesc from '../../hook/useProductByDiscountDesc';
import CountdownTimer from './CountdownTimer';
import PanigationProduct from '../PanigationProduct';
import Loading from '../../components/Loading';

function FlashSale() {
  const navigate = useNavigate();
  const { products, loading, error } = useProductByDiscountDesc();
  if (loading) return <Loading loading={loading} />;
  if (error) {
    navigate("/error");
    return null;
  }
  
  return (
    <>
      <div className='flash-sale'>
        <CountdownTimer />

        <PanigationProduct products={products.slice(0, 20)} />
      </div>
    </>
  );
}

export default FlashSale;