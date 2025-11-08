import React from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext';
import { useContext } from 'react';



const FoodItem = ({id,name,price,description,image}) => {
    const {addToCart,removeFromCart , cartItems} = useContext(StoreContext);
    
  return (
     <div className="food-item">
      <div className="food-item-img-container">
        {/*Correct backend image path */}
        <img
          src={`http://localhost:3000/images/${image}`}
          alt={name}
          className="food-item-img"
        />

        {/* Cart buttons */}
        {!cartItems[id] ? (
          <img
            className="add"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt="Add"
          />
        ) : (
          <div className="food-item-count">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt="Remove"
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt="Add More"
            />
          </div>
        )}
      </div>

        {/* Info section */}
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">₹{price}</p>
      </div>
    </div>
  );
    // <div>
    //   <div className="food-item">
    //     <div className="food-item-img-container">
    //         <img src={image} alt="" className="food-item-img" />
    //         {
    //             !cartItems[id] ?<img className='add' onClick={()=>addToCart(id)}src={assets.add_icon_white} alt=""/>
    //             : <div className="food-item-count">
    //                 <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" />
    //                 <p>{cartItems[id]}</p>
    //                 <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
    //               </div>
    //         }
    //     </div>
    //     <div className="food-item-info">
    //         <div className="food-item-name-rating">
    //             <p>{name}</p>
    //             <img src={assets.rating_starts} alt="" />
    //         </div>
    //         <p className="food-item-desc">
    //             {description}
    //         </p>
    //         <p className="food-item-price">${price}</p>
    //     </div>
    //   </div>
    // </div>
}

export default FoodItem
