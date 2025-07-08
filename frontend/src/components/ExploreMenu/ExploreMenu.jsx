import React from 'react'
import './ExploreMenu.css'
import {menu_list} from "../../assets/assets"
const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore our Menu</h1>
        <p className='explore-menu-text'>Choose from the diverse menu featuring a delectable array of dishes.</p>
        <div className="explore-menu-list">
            {menu_list.map((item, index) => (
                <div  onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} className="explore-menu-list-item" key={index}>
                    <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
                    <p>{item.menu_name}</p>
                </div>
            ))}
        </div>
        <hr />
    </div>
  )
}

export default ExploreMenu
