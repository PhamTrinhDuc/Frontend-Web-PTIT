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
import Dashboard from '../pages/admin/Dashboard';
import Inventory from '../pages/admin/Inventory';
import Promotion from '../pages/admin/Promotion';
import ManageCustomer from '../pages/admin/ManageCustomer';
import ViewOrder from '../pages/admin/ViewOrder';
import ManageProduct from '../pages/admin/ManageProduct';
import AminLayout from '../Layout/AminLayout';
import AddProduct from '../pages/admin/AddProduct';


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
        path: "product-detail/:id",
        element: <Product  /> // không cần truyền props product vì sẽ lấy dữ liệu từ API
      },
      {
        path: "cart",
        element: <Cart />
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
          },
          {
            path: "billing",
            element: <Billing />
          },
        ]
      },
    ]
  },
  
  {
    path: 'admin',
    element: <AminLayout />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'inventory',
        element: <Inventory />
      },
      {
        path: 'promotion',
        element: <Promotion />
      },
      {
        path: 'manage-customer',
        element: <ManageCustomer />
      },
      {
        path: 'view-order',
        element: <ViewOrder />
      },
      {
        path: 'add-product',
        element: <AddProduct />
      },
      {
        path: 'manage-product',
        element: <ManageProduct />
      },
      {
        path: "*",
        element: <Error />
      },
    ]
  }
]

export default routes;