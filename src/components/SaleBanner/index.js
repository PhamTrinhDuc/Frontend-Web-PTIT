import { Carousel } from "antd";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import './Banner.scss';
import spkear from '../../assets/images/sale_product.png'

const Banner = () => {
  const bannerContent = [
    {
      title: 'iPhone 14 Series',
      discount: 'Up to 10% off Voucher',
      image: 'https://png.pngtree.com/background/20240214/original/pngtree-black-shelf-banner-with-laptop-mobile-phone-and-tablet-pc-3d-picture-image_7703865.jpg',
    },
    {
      title: 'Headphone Collection',
      discount: 'Up to 20% off Voucher',
      image: 'https://api.beyerdynamic.de/media/catalog/category/beyerdynamic-Katalogbanner-Amiron-Copper-ohne-bubble.jpg', 
    },
    {
      title: 'Playstation Collection',
      discount: 'Up to 5% off Voucher',
      image: 'https://eu-images.contentstack.com/v3/assets/blt740a130ae3c5d529/blta361e2bebff3c1a8/66e066592ea67ba6a57a52ab/PS5_Pro_Header.png?width=1280&auto=webp&quality=95&format=jpg&disable=upscale',
    },
    {
      title: "Speaker's Collection",
      discount: 'Up to 15% off Voucher',
      image: spkear
    }
  ];

  return (
    <>
      <div className="banner">
        <Carousel autoplay>
          {bannerContent.map((item, index) => (
            <div key={index} className="banner-slide">
              <div
              className="banner-background"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${item.image})`,
              }}
            />
              <div className="banner-content" >
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