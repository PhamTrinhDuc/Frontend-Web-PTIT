import Login from '../pages/user/Login';
import SignUp from '../pages/user/SignUp';
import PrivateRoute from '../routes/PrivateRoutes';
import LayoutDefault from '../Layout/LayoutDefault';
import Home from '../pages/user/Home';
import About from '../pages/user/About';
import Contact from '../pages/user/Contact';
import Error from '../pages/user/Error';
import AllProduct from '../pages/user/AllProduct';
import Product from '../pages/user/Product';
import Cart from '../pages/user/Cart';
import Billing from '../pages/user/Billing';
import Account from '../pages/user/Account';
import EditProfile from '../components/Account/EditProfile';


export const routes = [
  {
    path: '/',
    element: <LayoutDefault />,
    children: [
      {
        path: '/', element: <Home />
      },
      {
        path: 'about', element: <About />
      },
      {
        path: 'contact', element: <Contact />
      },
      {
        path: 'login', 
        element: <Login />
      },
      {
        path: 'signup', 
        element: <SignUp />
      },
      {
        path: "products",
        element: <AllProduct />,
      },
      {
        path: "product-detail",
        element: <Product />
      },
      {
        path: "cart",
        element: <Cart />
      },
      {
        path: "billing",
        element: <Billing />
      },
      {
        path: "*",
        element: <Error />
      },
      {
        path: 'edit-profile',
        element: <EditProfile />
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: 'account',
            element: <Account />,
            children: [
              {
                path: 'edit-profile',
                element: <EditProfile />
              }
            ]
          }
        ]
      }
    ]
  }
]

export default routes;