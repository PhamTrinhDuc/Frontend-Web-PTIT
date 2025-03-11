import { Menu } from "antd";
import { FaHome, FaShoppingCart, FaInfoCircle, FaUserCircle} from "react-icons/fa";
import { Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { MdContactMail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png"

import "./Header.scss";

function Header() {
  const navigate = useNavigate();
  return (
    <header className="header">
      <div className="header__burger"></div>
      <div className="header__main">
        <div className="header__logo">
          <div className="logo"><img src={logo}></img></div>
          <p className="brand">Zenith</p>
        </div>
        
        <Menu mode="horizontal" className="header__menu">
          <Menu.Item key="home" icon={<FaHome />} onClick={() => navigate("/")} className="header__menu-item">
            Home
          </Menu.Item>
          <Menu.Item key="shop" icon={<FaShoppingCart />} onClick={() => navigate("/shop")} className="header__menu-item">
            Shop
          </Menu.Item>
          <Menu.Item key="about" icon={<FaInfoCircle />} onClick={() => navigate("/about")} className="header__menu-item">
            About
          </Menu.Item>
          <Menu.Item key="contact" icon={<MdContactMail />} onClick={() => navigate("/contact")} className="header__menu-item">
            Contact
          </Menu.Item>
        </Menu>

        <div className="header__search">
          <input type="text" placeholder="What you looking for ?" />
          <Button className="button__search" type="dashed" shape="circle" icon={<SearchOutlined />} />
        </div>

        <div className="header__auth">
          <Button type="ghost" icon={<FaShoppingCart />} className="header__auth-item">Cart</Button>
          <Button type="ghost" icon={< FaUserCircle />} className="header__auth-item">Sign in</Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
