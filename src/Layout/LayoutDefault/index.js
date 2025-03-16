import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Link, Outlet } from 'react-router-dom';
import AdminButton from '../../components/AdminButton';
import Header from '../Header';
import Footer from '../Footer';
import './LayoutDefault.scss';


function LayoutDefault() {

  // const { isLoggedIn, user } = useSelector((state) => state.auth);
  // const role = user?.role;
  const role = "admin"; // Thêm dòng này để test

  return (
    <>

      <div className="layout-default">
        <Header />
        <main className="layout-default__main">
          <Outlet />
          {/* Admin Button */}
          {role === "admin" && <AdminButton />}
        </main>
        <Footer />
      </div>
    </>
  );
}

export default LayoutDefault;