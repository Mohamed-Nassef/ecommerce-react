import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export default function CartContextProvider(props) {
    const [cartcount, setCartcount] = useState(0);
    function getHeaders() {
        return {
            token: localStorage.getItem("userToken")
        };
    }
    
    async function addToCart(productID) {
        try {
            const response = await axios.post(
                `https://ecommerce.routemisr.com/api/v1/cart`,
                { productId: productID },
                { headers: getHeaders() }
            );
            console.log(response.data);
            setCartcount(response.data.numOfCartItems)
            return response.data;
        } catch (error) {
            return null;
        }
    }
    async function getCart() {
        try {
            const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers: getHeaders() });
            return response.data;
        } catch (error) {
            return null;
        }
    }
    async function updateCartQuantity(productID, quantity) {
        try {
            const response = await axios.put(
                `https://ecommerce.routemisr.com/api/v1/cart/${productID}`,
                { count: quantity, },
                { headers: getHeaders() }
            );
            setCartcount(response.data.numOfCartItems);
            return response.data;
        } catch (error) {
            return null;
        }
    }
    async function deleteCartItem(productID) {
        try {
            const response = await axios.delete(
                `https://ecommerce.routemisr.com/api/v1/cart/${productID}`,
                { headers: getHeaders() }
            );
            setCartcount(response.data.numOfCartItems);
            return response.data;
        } catch (error) {
            return null;
        }
    }
    async function deleteAllCartItems(cartID) {
        try {
            const response = await axios.delete(
                `https://ecommerce.routemisr.com/api/v1/cart/${cartID}`,
                { headers: getHeaders() }
            );
            setCartcount(response.data.numOfCartItems);
            return response.data;
        } catch (error) {
            return null;
        }
    }

    useEffect(() => {
        async function fetchCartCount() {
            const data = await getCart();
            if (data?.numOfCartItems !== undefined) {
                setCartcount(data.numOfCartItems);
            }
        }

        if (localStorage.getItem("userToken")) {
            fetchCartCount();
        }
    }, []);

    return (
        <CartContext.Provider value={{ addToCart, getCart, updateCartQuantity, deleteCartItem, deleteAllCartItems, cartcount }}>
            {props.children}
        </CartContext.Provider>
    );
}