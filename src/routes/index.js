import React from 'react';
import { Navigate } from 'react-router-dom';
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
import SuccessOrder from '../pages/user/SuccessOrder';
import Inventory from '../pages/admin/Inventory';
import Promotion from '../pages/admin/Promotion';
import ProductIdentify from '../pages/user/ProductIdentify';
import ManageCustomer from '../pages/admin/ManageCustomer';
import ViewOrder from '../pages/admin/ViewOrder';
import ManageProduct from '../pages/admin/ManageProduct';
import ManageCategories from '../pages/admin/ManageCategories';
import AdminLayout from '../Layout/AdminLayout';
import AddProduct from '../pages/admin/AddProduct';
import EditProduct from '../pages/admin/EditProduct';
import ProtectedAdminRoute from "./ProtectedAdminRoute";
export const routes = [
  {
    path: "/",
    element: <LayoutDefault />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
      { path: "products", element: <AllProduct /> },
      { path: "product-detail/:id", element: <Product /> },
      { path: "products/:categorySlug", element: <ProductIdentify />},
      { path: "cart", element: <Cart /> },
      { path: "*", element: <Error /> },

      // Private Route cho user
      {
        element: <PrivateRoute />,
        children: [
          { path: "account", element: <Account /> },
          { path: "billing", element: <Billing />},
          { path: "edit-profile", element: <EditProfile /> },
          { path: "order-success", element: <SuccessOrder />},
        ],
      },
    ],
  },

  // Admin Routes - Đã thêm ProtectedAdminRoute
  {
    path: "admin",
    element: <ProtectedAdminRoute />,  // Kiểm tra quyền trước khi vào Admin
    children: [
      { index: true, element: <Navigate to="dashboard" /> },
      { path: "", element: <AdminLayout />, children: [
        { path: "dashboard", element: <Dashboard /> },
        { path: "inventory", element: <Inventory /> },
        { path: "promotion", element: <Promotion /> },
        { path: "manage-customer", element: <ManageCustomer /> },
        { path: "view-order", element: <ViewOrder /> },
        { path: "add-product", element: <AddProduct /> },
        { path: "edit-product/:id", element: <EditProduct /> },
        { path: "manage-categories", element: <ManageCategories /> },
        { path: "manage-product", element: <ManageProduct /> },
        { path: "*", element: <Error /> },
      ]},
    ],
  },
];
