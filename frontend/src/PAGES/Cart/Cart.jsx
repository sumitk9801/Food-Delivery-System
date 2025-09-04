import React, { useContext } from 'react'
import './Cart.css'
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';


const Cart = () => {
  const {cartItems , removeFromCart,food_list,getTotalCartAmount} = useContext(StoreContext);

  const navigate = useNavigate();

  return (
    <div>
      <div className="cart">
        <div className="cart-items">
          <div className="cart-items-title">
            <p>items</p>
            <p>title</p>
            <p>price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <br />
          <hr />
          {food_list.map((item,index) => {
            if(cartItems[item._id]>0){
           

              return(
                <div>
                <div className="cart-items-title cart-items-item" key={index}>
                  <img src={item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price*cartItems[item._id]}</p>
                  <p onClick={()=>(removeFromCart(item._id))} className='cross'>x</p>
                </div>
                <hr />
                </div>
              )
            }
          }
          )}
        </div>
        <div className="cart-bottom">
          {Object.values(cartItems).some(quantity => quantity > 0) ? (
            <>
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
                    <b>${getTotalCartAmount()+2}</b>
                  </div>
                </div>
                  <button onClick={()=>navigate('/order')}>Proceed to Checkout</button>
              </div>
              <div className="cart-promocode">
                <div className="">
                  <p>if you have promocode, Enter it here</p>
                  <div class="cart-promocode-input">
                    <input type="text" placeholder="promo code" />
                    <button>Submit</button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <p className='cart-empty'>"No item is Added to Cart"</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Cart
