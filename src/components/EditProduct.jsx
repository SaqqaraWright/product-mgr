import React, {useState, useEffect} from 'react';
import {useParams} from "react-router";
import axios from 'axios';
import {useHistory} from "react-router-dom";

const EditProduct = ()=>{

    const {_id} = useParams();

    const [productInfo, setProductInfo] = useState({});

    const history = useHistory(); //initialize history so that we can redirect using history.push()

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/products/${_id}`)
            .then(res=>{
                console.log("response-->", res)
                setProductInfo(res.data.results); //this state variable contains info about the product that I want to populate in my form
            })
            .catch(err=>console.log(err))
    }, [])

    const changeHandler = (e)=>{ //this allows me to update the state object in one "go"
        setProductInfo({
            ...productInfo,
            [e.target.name]: e.target.value
        })
    }
    const submitHandler = (e) =>{
        e.preventDefault();
        axios.put(`http://localhost:8000/api/products/${_id}`, productInfo)
        .then(res=>{
            console.log(res)
            history.push("/") //redirect after submitting form
        })
        .catch(err=>console.log(err))
    }

    return(
        <div>
            <form onSubmit={submitHandler} className="form-group">
                <div className="mb-3">
                    <label htmlFor="">Title:</label>
                    <input type="text" name="title" onChange={changeHandler}className="form-control" value={productInfo.title} />
                </div>
                <div className="mb-3">
                    <label htmlFor="">Price:</label>
                    <input type="number" name="price" onChange={changeHandler} className="form-control" value={productInfo.price} />
                </div>
                <div className="mb-3">
                    <label htmlFor="">Description:</label>
                    <input type="text" name="description" onChange={changeHandler} className="form-control" value={productInfo.description} />
                </div>
                <input type="submit" value="Edit Product" className="btn btn-success"/>
            </form>
        </div>
    );
};

export default EditProduct;