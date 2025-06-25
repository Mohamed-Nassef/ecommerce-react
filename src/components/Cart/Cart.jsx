import React, { useContext, useEffect, useState } from 'react';
import styles from './Cart.module.css';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import Spinner from '../Spinner/Spinner';
import { Link } from 'react-router-dom';

export default function Cart() {

  const { getCart, updateCartQuantity, deleteCartItem, deleteAllCartItems } = useContext(CartContext);
  const [cartItems, setCartItems] = useState(null);

  const [loading, setLoading] = useState(true);
  const [removingItemId, setRemovingItemId] = useState(null)
  const [updatingQtyId, setUpdatingQtyId] = useState(null);

  async function getLoggedUserCart() {
    setLoading(true);
    const data = await getCart();
    if (data?.status === 'success') {
      setCartItems(data.data);
    } else {
      console.error(data.message);
    }
    setLoading(false);
  }

  async function handleUpdateQuantity(productId, quantity) {
    setUpdatingQtyId(productId);
    const data = await updateCartQuantity(productId, quantity);
    setUpdatingQtyId(null);

    if (data?.status === 'success') {
      setCartItems(data.data);
      toast.success(`Quantity updated to ${quantity}`);
    } else {
      console.error(data.message);
      toast.error("Failed to update quantity");
    }
  }

  async function handleDeleteItem(productId) {
    setRemovingItemId(productId);
    const data = await deleteCartItem(productId);
    setRemovingItemId(null);

    if (data?.status === 'success') {
      setCartItems(data.data);
      toast.success("Item removed from cart");
    } else {
      console.error(data.message);
      toast.error("Failed to remove from cart");
    }
  }
  async function handleDeleteAllItems(cartID) {

    const confirmed = window.confirm("Are you sure you want to remove all items from the cart?");
    if (!confirmed) return;
    setLoading(true);
    handleClearCart();
    const data = await deleteAllCartItems(cartID);
    setLoading(false);
    if (data?.status === 'success') {
      setCartItems(null);
      toast.success("All items removed from cart");
    } else {
      console.error(data.message);
      toast.error("Failed to remove all items from cart");
    }
  }
  // al api not support delete all items in cart, so we will handle it manually
  async function handleClearCart() {
    const promises = cartItems.products.map(item =>
      deleteCartItem(item.product.id)
    );
    setLoading(true);
    await Promise.all(promises);
    getLoggedUserCart();
    setLoading(false);
  }


  useEffect(() => {
    getLoggedUserCart();
  }, []);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="p-4 text-emerald-600 ">
        <h2 className="text-xl text-gray-800 dark:text-white">Shopping Cart</h2>
        <h5>Total Price: {cartItems?.totalCartPrice} EGP</h5>
        <button
          onClick={() => handleDeleteAllItems(cartItems?._id)}
          className="text-red-600 hover:text-red-800 font-semibold border border-red-500 px-3 py-1 rounded-md hover:bg-red-50 transition right-5 top-5 absolute"
        >
          Clear Cart
        </button>
      </div>

      {loading ? (<Spinner />) : cartItems?.products?.length > 0 ? (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 border-b uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-16 py-3">Image</th>
              <th scope="col" className="px-6 py-3">Product</th>
              <th scope="col" className="px-6 py-3">Qty</th>
              <th scope="col" className="px-6 py-3">Price</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.products.map((item) => (
              <tr key={item.product.id} className="bg-white  dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
                <td className="p-4">
                  <Link to={`/productsdetails/${item.product.id}`}>
                  <img src={item.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Product" />
                </Link>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {item.product.title.length > 30 ? item.product.title.slice(0, 25) + '...' : item.product.title}
                </td>
                <td className="px-6 py-4 min-w-[120px]">
                  <div className="flex items-center justify-center">
                    <button
                      onClick={() => item.count > 1 && handleUpdateQuantity(item.product.id, item.count - 1)}
                      disabled={updatingQtyId === item.product.id}
                      className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 18 2">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                      </svg>
                    </button>

                    <div className="w-14 h-8 flex items-center justify-center">
                      {updatingQtyId === item.product.id ? (
                        <div className="animate-spin w-4 h-4 border-[3px] border-current border-t-transparent text-green-500 rounded-full" />
                      ) : (
                        <span className="text-sm text-gray-900">{item.count}</span>
                      )}
                    </div>

                    <button
                      onClick={() => handleUpdateQuantity(item.product.id, item.count + 1)}
                      disabled={updatingQtyId === item.product.id}
                      className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 18 18">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {item.price * item.count} EGP
                </td>
                <td className="px-6 py-4 min-w-[100px] text-center">
                  <button
                    onClick={() => handleDeleteItem(item.product.id)}
                    disabled={removingItemId === item.product.id}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {removingItemId === item.product.id ? (
                      <div className="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-white rounded-full" />
                    ) : (
                      "Remove"
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center p-10">
          <h2 className="text-2xl font-semibold text-gray-700">Your cart is empty</h2>
          <p className="text-gray-500 mt-2">Add some products to see them here.</p>
        </div>
      )}
    </div>
  );
}
