import React, { createContext, useState, useEffect, useMemo}  from 'react';
import { food_list } from '../assets/assets';
import axios from 'axios';



export const StoreContext = createContext(null);

const StoreContestProvider = (props)=>{

  const [cartItems , setCartItems]=useState({});
  const url = "http://localhost:3000";
  const [token,setToken]=useState("")
  const [searchTerm, setSearchTerm] = useState("");

  const loadCart = async () => {
    if (!token) return;
    try {
      const response = await axios.get(`${url}/api/cart/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      if (response.data.success) {
        const cartData = {};
        if (response.data.cart && response.data.cart.items) {
          response.data.cart.items.forEach(item => {
            if (item.foodId) {
              cartData[item.foodId.toString()] = item.quantity;
            }
          });
        }
        setCartItems(cartData);
      }
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      loadCart();
    }
  }, [token]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = async (ItemId) => {
    if (!token) {
      alert("Please login to add items to cart");
      return;
    }
    try {
      const response = await axios.post(`${url}/api/cart/add`, { foodId: ItemId, quantity: 1 }, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      if (response.data.success) {
        if(!cartItems[ItemId]) {
          setCartItems(prevItems => ({
              ...prevItems,
              [ItemId]: 1
          }));
        }
        else{
          setCartItems((prev)=>({...prev,[ItemId]:prev[ItemId]+1}));
        }
      } else {
        alert("Failed to add item to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Error adding to cart");
    }
  }

  const removeFromCart = async (ItemId)=>{
    if (!token) {
      alert("Please login to remove items from cart");
      return;
    }
    try {
      const response = await axios.post(`${url}/api/cart/remove`, { foodId: ItemId }, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      if (response.data.success) {
        if(!cartItems[ItemId]){
          return;
        }
        else{
          setCartItems((prev)=>({...prev,[ItemId]:prev[ItemId]-1}));
        }
      } else {
        alert("Failed to remove item from cart");
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
      alert("Error removing from cart");
    }
  }

  const getTotalCartAmount=()=>{
    let totalAmount=0;
    for(const item in cartItems){
      if(cartItems[item]>0){

        let itemInfo = food_list.find((product)=>product._id === item);
        totalAmount += itemInfo.price* cartItems[item];
      }
    }
    return totalAmount;
  }

  const filteredFoodList = useMemo(() => {
    if (!searchTerm) return food_list;
    return food_list.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

    const contextValue = {
        food_list,
        filteredFoodList,
        searchTerm,
        setSearchTerm,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }
      return(
        
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
      )  
}
export default StoreContestProvider;