import React from 'react'
import "./MyOrder.css"
import { useState ,useContext} from 'react';
import {StoreContext} from "../context/StoreContext.jsx"
import axios from 'axios';
import { useEffect } from 'react';
import { assets } from '../assets/assets.js';

const MyOrder = () => {
    const [data,setData]=useState([]);
    const{url,token}= useContext(StoreContext);

    const fetchOrders = async()=>{
       console.log(url);
        const response =  await axios.post(url+"/api/order/orders",{},{headers:{Authorization: `Bearer ${token}`}});
        setData(response.data.data);
        console.log(response.data.data);
    }

    useEffect(()=>{
        if(token){
            fetchOrders();
        }
    },[token]);

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <hr></hr>
      <div className="container">
        {
          data.map((order,index)=>{
            return(
              <div className="my-orders-order" key={index}>
                <img src={assets.parcel_icon} alt="" />
                <p>{order.items.map((item,index)=>{
                  if(index===order.items.length-1){
                    return item.name+"x"+item.quantity
                  }
                  else{
                    return item.name+"x"+item.quantity+", "
                  }
                })}</p>
                <p>${order.amount}.00</p>
                <p>Item: {order.items.length}</p>
                <p><span>&#x25cf;</span><b>{order.status}</b></p>
                <button>Track Order</button>
              </div>
              )
            })
        }
      </div>
    </div>
  )
}

export default MyOrder
