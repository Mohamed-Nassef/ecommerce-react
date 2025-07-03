import React, { use } from 'react';
import styles from './Wishlist.module.css';
import { useContext } from 'react';
import { useState } from 'react';
import { WishlistContext } from '../../Context/WishlistContext';
import { toast } from 'react-hot-toast';
import Spinner from '../Spinner/Spinner';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
export default function Wishlist() {

  const { getWishlist, deleteWishlistItem } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingWishlistId, setRemovingWishlistId] = useState(null)
  const [loadingAddToCart, setLoadingAddToCart] = useState(null);

  // add to cart function 
  async function handleAddToCart(productID) {
    setLoadingAddToCart(productID);
    let data = await addToCart(productID);
    if (data.status === 'success') {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
    setLoadingAddToCart(null);
  }
  // get logged user wishlist
  async function getLoggedUserWishlist() {
    setLoading(true);
    const data = await getWishlist();
    if (data?.status === 'success') {
      setWishlist(data.data);
      //console.log(data.data);
    } else {
      console.error(data.message);
    }
    setLoading(false);
  }
  // delete item from wishlist
  async function handleDeleteItem(productId) {
    setRemovingWishlistId(productId)
    const data = await deleteWishlistItem(productId);
    if (data?.status === 'success') {
      // console.log(data.data);
      toast.success("Item removed from wishlist");
      // api return only arr have id for product .. so we call getLoggedUserWishlist
      getLoggedUserWishlist();
    } else {
      console.error(data.message);
      toast.error("Failed to remove from wishlist");
    }
    setRemovingWishlistId(null)
  }
  // delete all items from wishlist we mak it manually
  async function handleDeleteAllItems() {
    console.log(wishlist);
    const promises = wishlist.map(item =>
      deleteWishlistItem(item.id)
    );
    setLoading(true);
    await Promise.all(promises);
    getLoggedUserWishlist();
    setLoading(false);
  }

  useEffect(() => {
    getLoggedUserWishlist();
  }, []);

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="p-4 text-emerald-600 ">
          <h2 className="text-xl text-gray-800 dark:text-white">whishlist </h2>
          <button
            onClick={() => handleDeleteAllItems()}
            className="text-red-600 hover:text-red-800 font-semibold border border-red-500 px-3 py-1 rounded-md hover:bg-red-50 transition right-5 top-5 absolute">
            Clear Wish List
          </button>
        </div>

        {loading ? (<Spinner />) : wishlist?.length > 0 ? (<>
          <table className="hidden md:table w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 border-b uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="text-center py-3 px-6:">Image</th>
                <th scope="col" className="text-center">Product</th>
                <th scope="col" className="text-center">Price</th>
                <th scope="col" className="text-center">Action</th>
                <th scope="col" className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {wishlist?.map((item) => (
                <tr key={item.id} className="bg-white border-b  dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600">
                  <td className="p-4 flex justify-center">
                    <Link to={`/productsdetails/${item.id}`}>
                      <img src={item.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Product" />
                    </Link>
                  </td>
                  <td className="text-center px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {item?.title?.length > 30 ? item.title.slice(0, 25) + '...' : item.title}
                  </td>
                  <td className="text-center px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {item?.priceAfterDiscount ? item.priceAfterDiscount : item.price} EGP
                  </td>
                  <td className="px-6 py-4 min-w-[100px] text-center">
                    <button
                      onClick={() => handleAddToCart(item.id)}
                      disabled={loadingAddToCart === item.id}
                      className="w-full bg-green-600 hover:bg-green-700 transition text-white py-2 rounded text-sm font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                      {loadingAddToCart === item.id ? (
                        <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                      ) : (
                        'Add to Cart'
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4 min-w-[100px] text-center">
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      disabled={removingWishlistId === item.id}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                      {removingWishlistId === item.id ? <div className="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-white rounded-full" /> : "Remove"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Mobile View */}
          <div className="md:hidden flex flex-col gap-4 p-4">
            {wishlist?.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
                <Link to={`/productsdetails/${item.id}`} className="flex items-center gap-4">
                  <img
                    src={item.imageCover}
                    className="w-24 h-24 object-contain rounded-lg border"
                    alt={item.title}
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 text-sm">
                      {item?.title?.length > 30 ? item.title.slice(0, 25) + '...' : item.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Price: <span className="text-emerald-600 font-semibold">{item?.priceAfterDiscount ?? item.price} EGP</span>
                    </p>
                  </div>
                </Link>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleAddToCart(item.id)}
                    disabled={loadingAddToCart === item.id}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 transition text-white py-2 rounded-md text-sm font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loadingAddToCart === item.id ? (
                      <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                    ) : (
                      'Add to Cart'
                    )}
                  </button>

                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    disabled={removingWishlistId === item.id}
                    className="flex-1 bg-gray-100 hover:bg-red-100 transition text-red-600 border border-red-500 py-2 rounded-md text-sm font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {removingWishlistId === item.id ? (
                      <span className="animate-spin w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full" />
                    ) : (
                      'Remove'
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

        </>

        ) : (
          <div className="text-center p-10">
            <h2 className="text-2xl font-semibold text-gray-700">Your Wish List is empty</h2>
            <p className="text-gray-500 mt-2">Add some products to see them here.</p>
            <Link to="/products" className="mt-4 inline-block bg-green-600 hover:bg-green-700 transition text-white py-2 px-4 rounded">
              Shop Now
            </Link>
          </div>
        )}
      </div>
    </>
  );
}