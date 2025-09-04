import React from 'react'
import "./Header.css"
const Header = () => {
  const handleViewMenu = () => {
    const element = document.getElementById('explore-menu');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className='header'>
        <div className="header-content">
            <h2>Order your fav food here</h2>
            <p>Order your food online from the best restaurants in town. Fast delivery and great taste guaranteed!</p>
            <button className='button' onClick={handleViewMenu}>View Menu</button>
        
        </div>

    </div>
  )
}

export default Header
