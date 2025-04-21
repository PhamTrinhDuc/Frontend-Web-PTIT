import { useState } from 'react';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
import useAllProduct from '../../../hook/useAllProduct';
import Loading from '../../../components/Loading';
import './Home.scss';
import Banner from '../../../components/SaleBanner';
import FlashSale from '../../../components/FlashSale';
import CategoryBanner from '../../../components/CategoryBanner';
// import BestSellingBanner from '../../../components/BestSellingBanner';
import BestSellingSection from '../../../components/BestSellingSection';
import NewArrival from '../../../components/NewArrival';
import Service from '../../../components/Service';
import { numPageProductHeader  } from '../../../utils/variable';

const { Content } = Layout;

function Home () {
  return (
    <>  
      <Content className='home-container'>
        <Banner />
        <FlashSale />
        <CategoryBanner />
        <BestSellingSection/>
        <NewArrival />
        <Service />
      </Content>
    </>
  )
}
export default Home;