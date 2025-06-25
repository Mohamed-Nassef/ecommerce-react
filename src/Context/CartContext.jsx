

import axios from "axios";
import { createContext } from "react";

export const CartContext = createContext();

export default function CartContextProvider(props) {
    let headers = {
        token: localStorage.getItem("userToken"),
    }

    async function addToCart(productID) {
        try {
            const response = await axios.post(
                `https://ecommerce.routemisr.com/api/v1/cart`,
                { productId: productID },
                { headers }
            );
            return response.data;
        } catch (error) {
            return null;
        }
    }
    async function getCart() {
        try {
            const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers });
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
                { headers }
            );
            return response.data;
        } catch (error) {
            return null;
        }
    }
    async function deleteCartItem(productID) {
        try {
            const response = await axios.delete(
                `https://ecommerce.routemisr.com/api/v1/cart/${productID}`,
                { headers }
            );
            return response.data;
        } catch (error) {
            return null;
        }
    }
    async function deleteAllCartItems(cartID) {
        try {
            const response = await axios.delete(
                `https://ecommerce.routemisr.com/api/v1/cart/${cartID}`,
                { headers }
            );
            return response.data;
        } catch (error) {
            return null;
        }
    }

    return (
        <CartContext.Provider value={{ addToCart, getCart, updateCartQuantity, deleteCartItem, deleteAllCartItems }}>
            {props.children}
        </CartContext.Provider>
    );
}