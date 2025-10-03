import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DashboardLayout from './Layouts/DashBoardLayout';
import DashBoard from './pages/DashBoard/DashBoard/DashBoard';
import Products from './pages/DashBoard/Products/product';
import Categories from './pages/DashBoard/Categories/categories';
import Orders from './pages/DashBoard/Orders/orders';
import HomeLayout from './Layouts/HomeLayout';
import HomePage from './pages/Home/home';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import WishList from './pages/WishList/WishList';
import MyOrders from './pages/MyOrders/MyOrders';
import LoginPage from './pages/Login/login';
import Register from './pages/Register/Register';
import { CreateUserProvider } from './Context/Context';
import Cart from './pages/Cart/Cart';

function App() {
  let router = createBrowserRouter([
    {
      path: '',
      element: <HomeLayout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'Products/:id', element: <ProductDetails /> },
        { path: 'WishList', element: <WishList /> },
        { path: 'Cart', element: <Cart /> },
        { path: 'MyOrders', element: <MyOrders /> },
        { path: 'Login', element: <LoginPage /> },
        { path: 'register', element: <Register /> },
      ],
    },
    {
      path: 'dashboard',
      element: <DashboardLayout />,
      children: [
        { index: true, element: <DashBoard /> },
        { path: 'products', element: <Products /> },
        { path: 'categories', element: <Categories /> },
        { path: 'orders', element: <Orders /> },
        { path: '*', element: <DashBoard /> },
      ],
    },
  ]);

  return (
    <>
      <CreateUserProvider>
        <RouterProvider router={router}></RouterProvider>
      </CreateUserProvider>
    </>
  );
}

export default App;
