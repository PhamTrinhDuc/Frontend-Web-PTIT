import Login from '../pages/user/Login';
import UserInfo from '../pages/user/UserInfo';
import PrivateRoute from '../routes/PrivateRoutes';
import LayoutDefault from '../Layout/LayoutDefault';
import Home from '../pages/user/Home';
import About from '../pages/user/About';
import Contact from '../pages/user/Contact';
import Error from '../pages/user/Error';

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
        path: "*",
        element: <Error />
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: 'info-user',
            element: <UserInfo />
          }
        ]
      }
    ]
  }
]

export default routes;