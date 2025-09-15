import React, { useContext,useEffect } from 'react'
import './verify.css'
import { useSearchParams } from 'react-router-dom';
import {StoreContext} from '../../context/StoreContext.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



const Verify = () => {
    const [searchParams,setsearchParams] =  useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");

    const {url, token} = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async()=>{
        try {
            const response = await axios.post(url + "/api/order/verify", {success, orderId}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if(response.data.success){
              navigate('/cart');
            }
            else{
              navigate('/');
            }
        } catch (error) {
            console.error("Verification error:", error);
            navigate('/');
        }
    }
    useEffect(()=>{
        verifyPayment();
    },[]);

    console.log(success,orderId);
  return (
    
      <div className='verify'>
        <div className="spinner"></div>
      </div>
  )
}

export default Verify
