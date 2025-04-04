import { useState } from 'react';
import { Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
import useAllProduct from '../../../hook/useAllProduct';
import Loading from '../../../components/Loading';
import './Home.scss';
import Banner from '../../../components/SaleBanner';
import FlashSale from '../../../components/FlashSale';
import CategoryBanner from '../../../components/CategoryBanner';
import BestSellingBanner from '../../../components/BestSellingBanner';
import NewArrival from '../../../components/NewArrival';
import Service from '../../../components/Service';

const { Content } = Layout;

const shuffleArray = (array) => {

  const newArr = array.slice(); // Tạo bản sao để không thay đổi mảng gốc
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};


function Home () {
  const navigate = useNavigate();
  const { products, loading, error } = useAllProduct();
  if (loading) return <Loading loading={loading} />;
  if (error) {
    navigate("/error");
    return null;
  }

  const randomSubset = shuffleArray(products).slice(0, 20);
  console.log(randomSubset);
  
  return (
    <>  
      <Content className='home-container'>
        <Banner />
        <FlashSale />
        <CategoryBanner />
        <BestSellingBanner products={randomSubset}/>
        <NewArrival />
        <Service />
      </Content>
    </>
  )
}
export default Home;