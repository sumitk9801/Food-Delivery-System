import React, { createContext, useState, useEffect, useMemo}  from 'react';
import { food_list } from '../assets/assets';



export const StoreContext = createContext(null);

const StoreContestProvider = (props)=>{

  const [cartItems , setCartItems]=useState({});
  const url = "http://localhost:3000";
  const [token,setToken]=useState("")
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (ItemId) => {
    if(!cartItems[ItemId]) {
        setCartItems(prevItems => ({
            ...prevItems,
            [ItemId]: 1
        }));
    }
    else{
      setCartItems((prev)=>({...prev,[ItemId]:prev[ItemId]+1}));
    }
  }
  const removeFromCart = (ItemId)=>{
    if(!cartItems[ItemId]){
      return;
    }
    else{
      setCartItems((prev)=>({...prev,[ItemId]:prev[ItemId]-1}));
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