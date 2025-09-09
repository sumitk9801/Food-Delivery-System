import React, { useContext, useState } from 'react'
import "./placeOrder.css"
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext'

const PlaceOrder = () => {

  const { getTotalCartAmount, token,food_list,cartItems,url } = useContext(StoreContext);
  const [deliveryInfo, setDeliveryInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setDeliveryInfo({ ...deliveryInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let orderItems = [];
    food_list.map((item)=>{
      if( cartItems[item._id]>0){
        let itemInfo=item;
        itemInfo["quantity"]=cartItems[item._id];
        orderItems.push(itemInfo);
      }
    
    })
    let orderData={
      deliveryInfo:deliveryInfo,
      items:orderItems,
      amount:getTotalCartAmount()+2
    }
    let response = await axios.post(url+"/api/order/place", orderData,{headers:{Authorization: `Bearer ${token}`}});
    if(response.data.success){
      const {url}=response.data;
      window.location.replace(url);
      setMessage("Order placed successfully!");

    } else {
      alert("Failed to place order. Please try again.");
    }
  };
 

  return (
    <div>
      <form onSubmit={handleSubmit} className='place-order'>
        <div className="place-order-left">
          <p className='title'>Delivery Information</p>
          <div className="multi-fields">
            <input type="text" name="firstName" placeholder='First name' value={deliveryInfo.firstName} onChange={handleChange} required />
            <input type="text" name="lastName" placeholder='Last name' value={deliveryInfo.lastName} onChange={handleChange} required />
          </div>
          <input type="email" name="email" placeholder='Email Address' value={deliveryInfo.email} onChange={handleChange} required />
          <input type="text" name="street" placeholder="street" value={deliveryInfo.street} onChange={handleChange} required />
          <div className="multi-fields">
            <input type="text" name="city" placeholder='City' value={deliveryInfo.city} onChange={handleChange} required />
            <input type="text" name="state" placeholder='State' value={deliveryInfo.state} onChange={handleChange} required />
          </div>
          <div className="multi-fields">
            <input type="text" name="zipCode" placeholder='Zip code' value={deliveryInfo.zipCode} onChange={handleChange} required />
            <input type="text" name="country" placeholder='Country' value={deliveryInfo.country} onChange={handleChange} required />
          </div>
          <input type="text" name="phone" placeholder='Phone' value={deliveryInfo.phone} onChange={handleChange} required />
        </div>
        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>${2}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>${getTotalCartAmount() + 2}</b>
              </div>
            </div>
            <button type="submit">Proceed to Payment</button>
            {message && <p className="order-message">{message}</p>}
          </div>
        </div>
      </form>
    </div>
  )
}

export default PlaceOrder
