import React,{useContext} from 'react'
import './FoodDisplay.css'

import { StoreContext } from '../../context/StoreContext.jsx'
import FoodItem from '../FoodItem/FoodItem.jsx';



const FoodDisplay = ({category}) => {
    const {filteredFoodList, searchTerm} = useContext(StoreContext);
  return (
    <div className='food-display' id='food-display'>
        <h2>Top Dishes near you</h2>
        <div className="food-display-list">
            {filteredFoodList.length > 0 ? (
                filteredFoodList.map((item,index)=>{
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
