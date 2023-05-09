import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import MainLayout from './layout/main';
import Product from './pages/product';
import EditProduct from './pages/edit-product';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/about',
        element: <div>About</div>,
      },
      {
        path: '/product',
        element: <Product />,
      },
      {
        path: '/product/edit',
        element: <EditProduct />,
      },
    ],
  },
]);

export default router;
