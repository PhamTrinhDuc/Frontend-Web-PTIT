
import { Row, Col, Button } from 'antd';import './NewArrival.scss';
import playstation from '../../assets/images/playstation.png';
import laptop from '../../assets/images/laptop.png';
import loudspeaker from '../../assets/images/loudspeaker.png';
import headphone from '../../assets/images/headphone.png';


function NewArrival() {

  const products = [
    {
      id: 1,
      type: 'large', // Khối lớn bên trái
      title: 'PlayStation 5',
      description: 'Black and White version of the PS5 coming out on sale.',
      image: playstation,
    },
    {
      id: 2,
      type: 'small', // Khối nhỏ bên phải
      title: 'Laptop',
      description: 'Provide new and modern models',
      image: laptop,
    },
    {
      id: 3,
      type: 'small', // Khối nhỏ bên phải
      title: 'Speakers',
      description: 'Amazon wireless speakers',
      image: loudspeaker,
    },
    {
      id: 4,
      type: 'small', // Khối nhỏ bên phải
      title: 'Headphones',
      description: 'Enhance the listening experience',
      image: headphone,
    },
  ];


  // Tách dữ liệu thành khối lớn và khối nhỏ
  const largeBlock = products.find((item) => item.type === 'large');
  const smallBlocks = products.filter((item) => item.type === 'small');

  // Chia khối nhỏ thành 2 hàng (mỗi hàng 1 hoặc 2 khối)
  const firstRow = smallBlocks.slice(0, 1); // Hàng 1: 1 khối
  const secondRow = smallBlocks.slice(1, 3); // Hàng 2: 2 khối

  return (
    <div className="banner-container">
      <Row gutter={[16, 16]}>
        {/* Khối lớn bên trái */}
        <Col xs={24} md={12}>
          {largeBlock && (
            <div className="banner-block large-block">
              <img src={largeBlock.image} alt={largeBlock.title} />
              <div className="block-content">
                <h3>{largeBlock.title}</h3>
                <p>{largeBlock.description}</p>
                <Button type="primary">Shop Now</Button>
              </div>
            </div>
          )}
        </Col>

        {/* Khối nhỏ bên phải */}
        <Col xs={24} md={12}>
          {/* Hàng 1 */}
          <Row gutter={[16, 16]}>
            {firstRow.map((block) => (
              <Col xs={24} key={block.id}>
                <div className="banner-block small-block">
                  <img src={block.image} alt={block.title} />
                  <div className="block-content">
                    <h3>{block.title}</h3>
                    <p>{block.description}</p>
                    <Button type="link">Shop Now</Button>
                  </div>
                </div>
              </Col>
            ))}
          </Row>

          {/* Hàng 2 */}
          <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
            {secondRow.map((block) => (
              <Col xs={12} key={block.id}>
                <div className="banner-block small-block">
                  <img src={block.image} alt={block.title} />
                  <div className="block-content">
                    <h3>{block.title}</h3>
                    <p>{block.description}</p>
                    <Button type="link">Shop Now</Button>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default NewArrival;