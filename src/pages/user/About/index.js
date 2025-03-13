import './About.scss';
import { Row, Col, Card, Typography } from 'antd';
import about_logo from '../../../assets/images/about_logo.png';
import { FaShop, FaSackDollar } from "react-icons/fa6";
import { AiFillDollarCircle  } from "react-icons/ai";
import { RiProductHuntFill } from "react-icons/ri";
import { FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import Service from '../../../components/Service';

const { Title, Text } = Typography;

const revenuaData = [
  {
    id: 1,
    title: 'Sallers active our site',
    value: 10.5,
    icon: <FaShop />
  },
  {
    id: 2,
    title: 'Mopnthly Produduct Sale',
    value: 33,
    icon: <AiFillDollarCircle />
  },
  {
    id: 3,
    title: 'Customer active in our site',
    value: 45.5,
    icon: <RiProductHuntFill />
  },
  {
    id: 4,
    title: 'Anual gross sale in our site',
    value: 25,
    icon: <FaSackDollar />
  }
]

const teamMembers = [
  {
    id: 1,
    name: 'Tom Cruise',
    position: 'Founder & Chairman',
    image: 'https://es.web.img2.acsta.net/pictures/17/02/08/16/50/452749.jpg', // Thay bằng URL ảnh thực tế
    socials: [
      { name: 'Twitter', icon: <FaTwitter /> },
      { name: 'Instagram', icon: <FaInstagram /> },
      { name: 'LinkedIn', icon: <FaLinkedinIn /> },
    ],
  },
  {
    id: 2,
    name: 'Emma Watson',
    position: 'Managing Director',
    image: 'https://es.web.img2.acsta.net/pictures/17/02/08/16/50/452749.jpg',
    socials: [
      { name: 'Twitter', icon: <FaTwitter /> },
      { name: 'Instagram', icon: <FaInstagram /> },
      { name: 'LinkedIn', icon: <FaLinkedinIn /> },
    ],
  },
  {
    id: 3,
    name: 'Will Smith',
    position: 'Product Designer',
    image: 'https://es.web.img2.acsta.net/pictures/17/02/08/16/50/452749.jpg',
    socials: [
      { name: 'Twitter', icon: <FaTwitter /> },
      { name: 'Instagram', icon: <FaInstagram /> },
      { name: 'LinkedIn', icon: <FaLinkedinIn /> },
    ],
  },
];


function About () {
  return (
    <div className='about-container'>
      {/* About Story  */}
      <div className='about-story'>
        <div className='about-content'>
          <h1>Our Story</h1>
            <p className='about-text'>
              Launced in 2015, Zenith is South Asia’s premier online shopping makterplace with an active presense in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sallers and 300 brands and serves 3 millioons customers across the region.
            </p>
            <p className='about-text'>
              Zenith has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assotment in categories ranging  from consumer. 
            </p>
        </div>
        <img src={about_logo} title='logo'></img>
      </div>
      {/* End about story  */}

      {/* Revenue Stats  */}
      <div className='revenue'>
        <Row gutter={[16, 16]} className="revenue-stats">
          {revenuaData.map((item) => (
            <Col key={item.id} xs={24} sm={12} md={12} lg={6}>
              <Card
                className={'revenue-card'} 
                bordered={false}
              >
                <div className="icon-wrapper">{item.icon}</div>
                <p className='value'>{item.value}K</p>
                <p className='title'>{item.title}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      {/* End Revenue Stats  */}

      {/* Team Members  */}
      <div className='members'>
        <Row gutter={[16, 16]} className="team-members">
        {teamMembers.map((member) => (
          <Col key={member.id} xs={24} sm={12} md={8}>
            <Card className="member-card" bordered={false}>
              <img src={member.image} alt={member.name} className="member-image" />
              <Title level={4} className="member-name">
                {member.name}
              </Title>
              <Text className="member-position">{member.position}</Text>
              <div className="social-links">
                {member.socials.map((social, index) => (
                  <a key={index} href="#" className="social-icon">
                    {social.icon}
                  </a>
                ))}
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      </div>
      {/* End Team Members  */}
        
      {/* Services  */}
      <Service />
      {/* End Services  */}
    </div>
  )
}

export default About