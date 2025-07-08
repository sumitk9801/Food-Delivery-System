import React,{useState} from 'react'
import Navbar from "./components/Navbar/Navbar.jsx"
import { Routes,Route } from 'react-router-dom'
import Home from './PAGES/Home/Home.jsx'
import PlaceOrder from './PAGES/PlaceOrder/placeOrder.jsx'
import Cart from './PAGES/Cart/Cart.jsx';
import Footer from './components/Footer/Footer.jsx'
import LoginPopup from './components/LoginPopup/Loginpop.jsx'

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  return (
    <>
    {
      showLogin ? <LoginPopup setShowLogin={setShowLogin} />:<></>
    }
    <div className='app'>
      <Navbar setShowLogin={setShowLogin} />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/order' element={<PlaceOrder/>}/>
      </Routes>
    </div>
    <Footer/>
    </>
  )
}

export default App
