import React from 'react'
import './Add.css'
import { assets } from '../../assets/assets.js'
import { useState } from 'react'
import axios from "axios"
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'


const Add = ({url}) => {

    const navigate = useNavigate();
    const [image,setImage]=useState(null);
    const [data,setData]=useState({
        _id:Date.now(),
        name:"",
        description:"",
        price:"",
        category:"Salad"
    });
    const onChangeHandler=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
        setData(data=>({...data,[name]:value}));
    }
    const onSubmitHandler = async(event)=>{
        
        event.preventDefault();
        const formData = new FormData();

        formData.append("name",data.name);
        formData.append("description",data.description);
        formData.append("price",Number(data.price));
        formData.append("category",data.category);
        formData.append("image",image); // Use the image state variable instead of data.image
        const response = await axios.post(`${url}/api/food/add`,formData);

        
        
        if(response.data.success){
            setData({
            _id:Date.now(),
            name:"",
            description:"",
            price:"",
            category:"Salad"
            })
            setImage(false);
            toast.success(response.data.message)
            // Navigate to list page with the new food id
            if(response.data.data && response.data.data._id){
                navigate('/list', { state: { newFoodId: response.data.data._id } });
            } else {
                navigate('/list');
            }
        }
        else{
            toast.error(response.data.message);
        }
        
    }
  return (
    <div className='add'>
        <form className='flex-col'onSubmit={onSubmitHandler}>
            <div className="add-img-uplaoad flex-col">
                <p>upload Image</p>
                <label htmlFor="image">
                    <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                </label>
                <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required />
            </div>
            <div className="add-product-name flex-col">
                <p>Product name</p>
                <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder='Type here' />
            </div>
            <div className="add-product-description flex-col">
                <p>Product description</p>
                <textarea  onChange={onChangeHandler} value={data.description} name="description" rows="6"placeholder='Write content here'></textarea>
            </div>
            <div className="add-category-price">
                <div className="add-category flex-col">
                    <p>Product category</p>
                    <select onChange={onChangeHandler} name="category" >
                        <option value="Salad">
                            Salad
                        </option>
                        <option value="Rolls">Rolls</option>
                        <option value="Deserts">Deserts</option>
                        <option value="Sandwitch">Sandwitch</option>
                        <option value="Cake">Cake</option>
                        <option value="Pure veg">Pure veg</option>
                        <option value="Pasta">Pasta</option>
                        <option value="Noodles">Noodles</option>
                    </select>
                </div>
                <div className="add-price flex-col">
                    <p>Product price</p>
                    <input onChange={onChangeHandler} value={data.price}type="Number" name="price" placeholder='$2' />
                </div>
            </div>
            <button type="submit" className='add-btn' >ADD</button>
        </form>
        
    </div>
  )
}

export default Add