import { Carousel } from "antd";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import './Banner.scss';

const Banner = () => {
  const [rotate, setRotate] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotate((prev) => (prev === 10 ? -10 : 10)); // Xoay nhẹ qua lại
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const bannerContent = [
    {
      title: 'iPhone 14 Series',
      discount: 'Up to 10% off Voucher',
      image: 'https://w7.pngwing.com/pngs/961/642/png-transparent-iphone-14-pro-thumbnail.png',
    },
    {
      title: 'iPhone 14 Pro',
      discount: 'Up to 15% off Voucher',
      image: 'https://api.beyerdynamic.de/media/catalog/category/beyerdynamic-Katalogbanner-Amiron-Copper-ohne-bubble.jpg', 
    },
  ];

  return (
    <>
      <div className="banner">

        <Carousel autoplay>
          {bannerContent.map((item, index) => (
            <div key={index} className="banner-slide">
              <div className="banner-content">
                <h2>{item.title}</h2>
                <h1>{item.discount}</h1>
                <Link to="/shop" className="shop-now">
                  Shop Now <span>→</span>
                </Link>
              </div>

            </div>
          ))}
        </Carousel>
      </div>
    </>
  )
}

export default Banner;