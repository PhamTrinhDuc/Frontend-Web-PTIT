import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { fetchWishlist } from '../../slices/wishlistSlice';
import AdminButton from '../../components/AdminButton';
import Header from '../Header';
import Footer from '../Footer';
import './LayoutDefault.scss';
import Chatbot from '../../pages/user/Chatbot';


function LayoutDefault() {

  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const role = user?.role;

  useEffect(() => {
    if (isLoggedIn && user?.id) {
      dispatch(fetchWishlist(user.id));
    }
  }, [isLoggedIn, user?.id, dispatch]);

  return (
    <>

      <div className="layout-default">
        <Header />
        <main className="layout-default__main">
          <Outlet />
          {/* Admin Button */}
          {role === "admin" && <AdminButton />}
          {isLoggedIn && <Chatbot /> }
        </main>
        <Footer />
      </div>
    </>
  );
}

export default LayoutDefault;