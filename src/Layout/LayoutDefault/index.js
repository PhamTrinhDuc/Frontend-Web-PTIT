import React from 'react';
import { NavLink, Link, Outlet } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import './LayoutDefault.scss';


function LayoutDefault() {

  const navLinkActive = (e) => {
    return e.isActive ? 'menu__link menu__link--active' : 'menu__link';
  }
  return (
    <>
      <div className="layout-default">
        <Header />
        <main className="layout-default__main">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default LayoutDefault;