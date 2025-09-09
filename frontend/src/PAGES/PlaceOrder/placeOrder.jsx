import React, { useContext, useState } from 'react'
import "./placeOrder.css"
import { StoreContext } from '../../context/StoreContext'

const PlaceOrder = () => {

  const { getTotalCartAmount, userToken } = useContext(StoreContext);
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
    try {
      const response = await fetch('http://localhost:3000/api/order/place', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
        body: JSON.stringify({ deliveryInfo })
      });
      const data = await response.json();
      if (data.success) {
        setMessage('Order placed successfully!');
      } else {
        setMessage('Failed to place order.');
      }
    } catch (err) {
      console.log(err);
      setMessage('Error placing order.');
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
