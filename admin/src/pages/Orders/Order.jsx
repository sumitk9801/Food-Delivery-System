import React from 'react'
import './Order.css'
import { useState ,useEffect} from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import { assets } from '../../assets/assets';

const Order = ({url}) => {
  const [orders,setOrders]=useState([]);
  const fetchAllOrders=async()=>{
    
      const response = await axios.get(url + '/api/order/list');

      if(response.data.success){
        setOrders(response.data.data);
        console.log(response.data.data);
      }
      else{
        toast.error("Failed to fetch orders");
      
      }
  }
  useEffect(()=>{
    fetchAllOrders();
  },[]);
  return (
    <div className="order add">
        <h3>Order Page</h3>
      <div className='order-list'>
        {orders.map((order,index)=>{
          return (
            <div className="order-item" key={index}>
              <img src={assets.parcel_icon}/>
              <div>
                <p className="order-item-food">
                  {order.items.map((item,idx)=>{
                    if(idx===order.items.length-1){
                      return (item.foodName || "Unknown food")+"x"+item.quantity;
                    }
                    else{
                      return (item.foodName || "Unknown food")+"x"+item.quantity+ ", ";
                    }
                  })}
                </p>
                <p className="order-item-name">
                  {order.deliveryInfo.firstName + " " + order.deliveryInfo.lastName}
                </p>
                <div className="order-item-address">
                  <p>
                    {order.deliveryInfo.street}, {order.deliveryInfo.city}, {order.deliveryInfo.state} - {order.deliveryInfo.zipCode}
                  </p>
                </div>
                <p className="order-item-phone">{order.deliveryInfo.phone}</p>

              </div>
              <p>
                Items : {order.items.length }
              </p>
          <p>${order.totalAmount}</p>
              <select name="" id="" className="order-item-select">
                <option value="Food processing">Food processing</option>
                <option value="Out of Delivery">Out of Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default Order