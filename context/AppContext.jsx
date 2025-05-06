'use client';

import { productsDummyData, userDummyData } from "@/assets/assets";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const useAppContext = () => {
    return useContext(AppContext);
};

export const AppContextProvider = (props) => {
    const currency = process.env.NEXT_PUBLIC_CURRENCY;
    const router = useRouter();

    const [products, setProducts] = useState([]);
    const [userData, setUserData] = useState(false);
    const [isSeller, setIsSeller] = useState(false);
    const [orders, setOrders] = useState([]);
    const [cartItems, setCartItems] = useState({});

    const fetchProductData = async () => {
        setProducts(productsDummyData);
    };

    const fetchUserData = async () => {
        setUserData(userDummyData);
    };

    const addToCart = async (itemId) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            cartData[itemId] += 1;
        } else {
            cartData[itemId] = 1;
        }
        setCartItems(cartData);
    };

    const createOrder = (selectedAddress) => {
        const newOrder = {
            id: Date.now().toString(),
            items: Object.entries(cartItems).map(([productId, quantity]) => {
                const product = products.find(p => p._id === productId);
                return {
                    ...product,
                    quantity
                };
            }),
            address: selectedAddress,
            placedAt: new Date(),
            deliverySlotMinutes: 1, // dummy slot window (e.g., 1 minute from order placed)
            status: "Out for delivery"
        };
    
        setOrders([...orders, newOrder]);
        setCartItems({}); // clear cart
        router.push("/orders"); // navigate to orders page
    };
    const updateCartQuantity = async (itemId, quantity) => {
        let cartData = structuredClone(cartItems);
        if (quantity === 0) {
            delete cartData[itemId];
        } else {
            cartData[itemId] = quantity;
        }
        setCartItems(cartData);
    };

    const getCartCount = () => {
        let totalCount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalCount += cartItems[item];
            }
        }
        return totalCount;
    };

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            let itemInfo = products.find((product) => product._id === item);
            if (cartItems[item] > 0 && itemInfo) {
               
                totalAmount += itemInfo.flag==1?itemInfo.discountedPrice * cartItems[item]:itemInfo.offerPrice * cartItems[item] ;
            }
        }
        return Math.floor(totalAmount * 100) / 100;
    };

    const editProductDiscountedPrice = (productId, newDiscountedPrice) => {
        const updatedProducts = products.map((product) => {
            if (product._id === productId) {
                console.log("OP"+newDiscountedPrice);
                return {
                    ...product,
                    discountedPrice: newDiscountedPrice,
                    flag:1
                };
            }
            return product;
        });

        setProducts(updatedProducts);
        
    };
    const editProductFlag = (productId,f) => {
        const updatedProducts = products.map((product) => {
            if (product._id === productId) {
               
                return {
                    ...product,
                    flag:f
                };
            }
            return product;
        });

        setProducts(updatedProducts);
        
    };

    useEffect(() => {
        fetchProductData();
    }, []);

    useEffect(() => {
        fetchUserData();
    }, []);

    const value = {
        currency,
        router,
        isSeller,
        setIsSeller,
        userData,
        fetchUserData,
        products,
        fetchProductData,
        cartItems,
        setCartItems,
        addToCart,
        updateCartQuantity,
        getCartCount,
        getCartAmount,
        editProductDiscountedPrice,
        editProductFlag,
        createOrder,
        orders
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};
