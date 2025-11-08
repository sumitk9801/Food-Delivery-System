import React,{useContext} from 'react'
import './FoodDisplay.css'
// import { food_list } from '../../assets/assets.jsx'
import { useState, useEffect } from 'react';  
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext.jsx'
import FoodItem from '../FoodItem/FoodItem.jsx';



const FoodDisplay = ({category}) => {
    const { searchTerm} = useContext(StoreContext);
    const [foods,setFoods]=useState([])
    useEffect(() => {
      const fetchFoods = async () => {
          try{
          const response =  await axios.get("http://localhost:3000/api/food/list");
          if(response.data.success){
            setFoods(response.data.data);
          }
        }catch(error){
          console.log("Error fetching food items:",error);
        }
      };
       fetchFoods();
    },[]);

    
  return (
    <div className='food-display' id='food-display'>
        <h2>Top Dishes near you</h2>
        <div className="food-display-list">
            {foods.length > 0 ? (
                foods.map((item,index)=>{
                  if(category==="All" || category === item.category){
                    return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
                  }
                })
            ) : searchTerm ? (
                <p style={{textAlign: 'center', fontSize: '30px', marginTop: '50px'}}>Not Found Item</p>
            ) : null}
        </div>
    </div>
  )
}

export default FoodDisplay
