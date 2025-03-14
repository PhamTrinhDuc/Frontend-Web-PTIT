import { useState } from 'react';
import { Layout } from 'antd';
import './Home.scss';
import Banner from '../../../components/SaleBanner';
import FlashSale from '../../../components/FlashSale';
import CategoryBanner from '../../../components/CategoryBanner';
import BestSellingBanner from '../../../components/BestSellingBanner';
import NewArrival from '../../../components/NewArrival';
import Service from '../../../components/Service';

const { Content } = Layout;

function Home () {
  return (
    <>  
      <Content className='content'>
        <Banner />
        <FlashSale />
        <CategoryBanner />
        <BestSellingBanner />
        <NewArrival />
        <Service />
      </Content>
    </>
  )
}
export default Home;