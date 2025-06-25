import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CartContextProvider from './Context/CartContext'
import { Toaster } from 'react-hot-toast';

let router = createBrowserRouter([
  {
    path: '', element: <Layout />, children: [
      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
      { path: 'register', element: <Register /> },
      { path: 'login', element: <Login /> },
      { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
      { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: 'productsdetails/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
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
              <RouterProvider router={router}></RouterProvider>
              <ReactQueryDevtools initialIsOpen={false} />
              <Toaster />
            </CartContextProvider>
          </QueryClientProvider>
        </CounterContextProvider>
      </UserContextProvider>
    </>
  )
}

export default App
