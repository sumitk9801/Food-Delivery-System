import React, { useContext, useState } from 'react'
import "./placeOrder.css"
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext'

const PlaceOrder = () => {

  const { getTotalCartAmount, token, url, food_list, cartItems} = useContext(StoreContext);
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

  const handleChange = (e) => {
    setDeliveryInfo({ ...deliveryInfo, [e.target.name]: e.target.value });
    console.log(`${token}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Please sign in to place an order.");
      return;
    }

    let orderItems = [];
    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = {
          foodId: item._id,
          quantity: cartItems[item._id],
          name: item.name,
          description: item.description,
          price: item.price
        };
        orderItems.push(itemInfo);
      }
    });

    if (!deliveryInfo || !orderItems || orderItems.length === 0 || !getTotalCartAmount()) {
      console.log("Invalid order data:", { deliveryInfo, orderItems, amount: getTotalCartAmount() });
      alert("Invalid order data");
      return;
    }

    let orderData = { deliveryInfo: deliveryInfo, items: orderItems, amount: getTotalCartAmount() + 2 };
    console.log("OrderData Sent:", orderData);
    try {

      console.log(orderData);
      let response = await axios.post(url + "/api/order/place", orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      if (response.data.success) {
        const {session_url} = response.data;

        window.location.replace(session_url);
        alert("Order placed successfully!");
      } else {
        alert("Failed to place order. Please try again.");
      }
  } catch (error) {
    console.error("Order Error:", error);
    alert("Something went wrong. Please try again later.");
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
          </div>
        </div>
      </form>
    </div>
  )
}
 const verify_Order = async (req, res) => {
  
 }

export default {PlaceOrder, verify_Order};
