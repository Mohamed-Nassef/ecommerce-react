import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Cart from './components/Cart/Cart'
import Brands from './components/Brands/Brands'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import Categories from './components/Categories/Categories'
import Products from './components/Products/Products'
import Notfound from './components/Notfound/Notfound'
import CounterContextProvider from './Context/CounterContext'
import UserContextProvider from './Context/UserContext'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import ProductDetails from './components/ProductDetails/ProductDetails'
import CategoriesDetails from './components/CategoriesDetails/CategoriesDetails'
import SpecificSubCategory from './components/specificSubCategory/specificSubCategory'
import SubCategoriesByCategoryWrapper from './components/SubCategoriesByCategoryWrapper/SubCategoriesByCategoryWrapper'
import BrandsDetails from './components/BrandsDetails/BrandsDetails'
import Wishlist from './components/Wishlist/Wishlist'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CartContextProvider from './Context/CartContext'
import WishlistContextProvider from './Context/WishlistContext';
import { Toaster } from 'react-hot-toast';

let router = createBrowserRouter([
  {
    path: '', element: <Layout />, children: [
      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: 'ecommerce-react', element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
      { path: 'brands/:id', element: <ProtectedRoute><BrandsDetails /></ProtectedRoute> },
      { path: 'register', element: <Register /> },
      { path: 'login', element: <Login /> },
      { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
      { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: 'productsdetails/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
      { path: 'categories/:id', element: <ProtectedRoute><CategoriesDetails /></ProtectedRoute> },
      { path: '/categories/:id/subcategories', element: <ProtectedRoute><SubCategoriesByCategoryWrapper /></ProtectedRoute> },
      { path: 'wishlist', element: <ProtectedRoute><Wishlist /></ProtectedRoute> },
      { path: '/subcategories/:id', element: <ProtectedRoute><SpecificSubCategory /></ProtectedRoute> },

      { path: '*', element: <Notfound /> },
    ]
  },
])
const queryClient = new QueryClient()
function App() {

  return (
    <>
      <UserContextProvider>
        <CounterContextProvider>
          <QueryClientProvider client={queryClient}>
            <CartContextProvider>
              <WishlistContextProvider>
                <RouterProvider router={router} />
                <Toaster />
                <ReactQueryDevtools initialIsOpen={false} />
              </WishlistContextProvider>
            </CartContextProvider>
          </QueryClientProvider>
        </CounterContextProvider>
      </UserContextProvider>
    </>
  )
}

export default App
