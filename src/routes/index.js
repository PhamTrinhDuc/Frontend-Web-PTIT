import Login from '../components/Login';
import InfoUser from '../components/InfoUser';
import PrivateRoute from '../components/PrivateRoute';
import LayoutDefault from '../Layout/LayoutDefault';
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Error from '../pages/Error';
import Blog from '../pages/Blog';
import BlogAll from '../pages/Blog/BlogAll';
import BlogNews from '../pages/Blog/BlogNew';
import BlogRelated from '../pages/Blog/BlogRelated';
import BlogDetail from '../pages/Blog/BlogDetail';

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
        path: 'blog', element: <Blog />,
        children: [
          {
            index: true, element: <BlogAll />
          },
          {
            path: 'news', element: <BlogNews />
          },
          {
            path: 'related', element: <BlogRelated />
          },
          {
            path: ':id', element: <BlogDetail />
          }
        ]
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
            element: <InfoUser />
          }
        ]
      }
    ]
  }
]