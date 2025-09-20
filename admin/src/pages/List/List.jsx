import React from 'react'
import './List.css'
import axios from "axios";
import {toast} from 'react-toastify'
import { useEffect,useState } from 'react';
import { useLocation } from 'react-router-dom';

const List = ({url}) => {

  const location = useLocation();
  const [list,setList]=useState([]);
  const [newFoodId, setNewFoodId] = useState(null);

  const fetchList= async()=>{

    const response = await axios.get(url+"/api/food/list")


    if(response.data.success){
      setList(response.data.data);
      console.log(response.data.data);
    }
    else{
      toast.error(response.data.message);
    }
  }
  useEffect(()=>{
    fetchList()
  },[])

  useEffect(() => {
    if (location.state && location.state.newFoodId) {
      setNewFoodId(location.state.newFoodId);
      // Clear the newFoodId after a delay to remove highlight
      setTimeout(() => {
        setNewFoodId(null);
      }, 5000); // Highlight for 5 seconds
    }
  }, [location.state]);

  const removeFood=async(foodId)=>{
    const response = await axios.delete(`${url}/api/food/remove/${foodId}`);
    await fetchList();
    if(response.data.success){
      toast.success(response.data.message)
    }
    else{
      toast.error(response.data.message);
    }

  }

  return (
    <div className='list add flex-col'>
      <p>All food list</p>
      <div className='list-table'>
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item,index)=>{
          return (
            <div key ={index} className={`list-table-format ${item._id === newFoodId ? 'highlighted' : ''}`}>
              <img src={`${url}/images/`+item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={()=>removeFood(item._id)} className='cursor'>X</p>
            </div>
          )
        })}
      </div>
    </div>

  )
}

export default List