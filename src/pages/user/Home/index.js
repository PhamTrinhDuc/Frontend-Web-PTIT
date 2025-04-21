import { Layout } from 'antd';
import './Home.scss';
import Banner from '../../../components/SaleBanner';
import CategoryBanner from '../../../components/CategoryBanner';
import BestSellingSection from '../../../components/BestSellingSection';
import NewArrival from '../../../components/NewArrival';
import Service from '../../../components/Service';
import FlashSaleSection from '../../../components/FlashSaleSection';

const { Content } = Layout;

function Home () {
  return (
    <>  
      <Content className='home-container'>
        <Banner />
        <FlashSaleSection />
        <CategoryBanner />
        <BestSellingSection/>
        <NewArrival />
        <Service />
      </Content>
    </>
  )
}
export default Home;