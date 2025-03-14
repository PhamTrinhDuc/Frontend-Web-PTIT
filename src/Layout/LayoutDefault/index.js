import React from 'react';
import { NavLink, Link, Outlet } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import './LayoutDefault.scss';


function LayoutDefault() {

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