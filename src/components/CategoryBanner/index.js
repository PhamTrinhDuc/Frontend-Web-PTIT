import { TbRectangleVerticalFilled } from "react-icons/tb";
import { SlScreenSmartphone } from "react-icons/sl";
import { FaComputer } from "react-icons/fa6";
import { BsSmartwatch } from "react-icons/bs";
import { FaCamera, FaHeadphonesAlt  } from "react-icons/fa";
import { MdVideogameAsset } from "react-icons/md";
import { Link } from 'react-router-dom';




import { Row, Col } from 'antd';
import './CategoryBanner.scss';


function CategoryBanner() {

  const categoryIcons = [
    <SlScreenSmartphone className="icon-category"/>,
    <FaComputer className="icon-category" />,
    <FaCamera className="icon-category"  />,
    <BsSmartwatch className="icon-category" />,
    <MdVideogameAsset className="icon-category"/>,
    <FaHeadphonesAlt className="icon-category"/>
  ];

  const categoriesList = [
    {
      id: 1,
      name: 'Phones',
    },
    {
      id: 2,
      name: 'Computers',
    },
    {
      id: 3,
      name: 'Camera',
    },
    {
      id: 4,
      name: 'Smart Watches',
    },
    {
      id: 5,
      name: 'Gamming',
    },
    {
      id: 6,
      name: 'Headphones',
    }
  ];  

  return (
    <>
      <div className="category-container" >
        <div className="category-title">
          <TbRectangleVerticalFilled className="icon"/>
          <h1>Categories</h1>
        </div>
        <h2>Browse By Category</h2>

        <Row className="category-row" gutter={[16, 16]} justify="center">
          {categoriesList.map((category) => (
              <Col xs={24} sm={12} md={8} lg={4} key={category.id}>
                <Link to = {`category${category.name}`}>
                    <div className="category-item">
                      {categoryIcons[category.id-1]}
                      <h3>{category.name}</h3>
                    </div>
                </Link>
              </Col>
          ))}
        </Row>
      </div>
    </>
  );
}

export default CategoryBanner;