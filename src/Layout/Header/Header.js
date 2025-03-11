import {Menu} from 'antd';
import {FaHome, FaShoppingCart} from 'react-icons/fa';
import { FaInfoCircle } from "react-icons/fa";
import { MdContactMail } from "react-icons/md";
import { Link } from 'react-router-dom';
import './Header.scss'; 

function Header() {
  return (
    <>
      <header className='header'>
        <div className='header__burger'>
        </div>
        <div className='header__logo'>
          Zenith
        </div>
        <Menu mode='horizontal' className='header__menu'>
          <Link to='/'>
            <Menu.Item className='header__home' icon={<FaHome />}>
              Home
            </Menu.Item>
          </Link>
          <Menu.Item key='header__shop' icon={<FaShoppingCart />}>
            Shop
          </Menu.Item>
          <Menu.Item key='header__about' icon={<FaInfoCircle />}>
            About
          </Menu.Item>
          <Menu.Item key='header__contact' icon={<MdContactMail />}>
            Contact
          </Menu.Item>
        </Menu>
      </header>
    </>
  )
}
export default Header;