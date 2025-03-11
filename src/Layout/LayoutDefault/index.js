import { NavLink, Link, Outlet } from 'react-router-dom';
import Header from '../Header'


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
        <footer className="layout-default__footer">
          Copyright @2023 by PTIT
        </footer>
      </div>
    </>
  );
}

export default LayoutDefault;