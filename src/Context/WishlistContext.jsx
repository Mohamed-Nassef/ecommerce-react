import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const WishlistContext = createContext();

export default function WishlistContextProvider(props) {
    const [wishlistcount, setWishlistcount] = useState(0);
    const [wishlistIds, setWishlistIds] = useState([]);

    function getHeaders() {
        return {
            token: localStorage.getItem("userToken")
        };
    }

    async function addToWishlist(productID) {
        try {
            const response = await axios.post(
                `https://ecommerce.routemisr.com/api/v1/wishlist`,
                { productId: productID },
                { headers: getHeaders() }
            );
            //console.log(response.data);
            setWishlistcount(response.data.data.length);
            setWishlistIds(response.data.data);
            return response.data;
        } catch (error) {
            return null;
        }
    }

    async function getWishlist() {
        try {
            const response = await axios.get(
                `https://ecommerce.routemisr.com/api/v1/wishlist`,
                { headers: getHeaders() }
            );
            // add wishlist ids for ui view 
            const ids = response.data.data.map(item => item.id);
            setWishlistIds(ids);
            return response.data;
        } catch (error) {
            return null;
        }
    }

    async function deleteWishlistItem(productID) {
        try {
            const response = await axios.delete(
                `https://ecommerce.routemisr.com/api/v1/wishlist/${productID}`,
                { headers: getHeaders() }
            );
            setWishlistcount(response.data.data.length);
            return response.data;
        } catch (error) {
            return null;
        }
    }



    useEffect(() => {
        async function fetchWishlistCount() {
            const data = await getWishlist();
            console.log("hello,", data.count);
            if (data?.count !== undefined) {
                setWishlistcount(data?.count);
            }
        }
        if (localStorage.getItem("userToken")) {
            fetchWishlistCount();
        }
    }, []);

    return (
        <WishlistContext.Provider
            value={{ addToWishlist, getWishlist, wishlistcount, deleteWishlistItem, wishlistIds }}
        >
            {props.children}
        </WishlistContext.Provider>
    );
}
