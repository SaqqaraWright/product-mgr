import React, {useState, useEffect} from "react";
import {useParams} from "react-router";
import axios from 'axios';
import {useHistory} from "react-router-dom";



const OneProduct = () => {
    const {_id} = useParams();
    //state variable to store the one product we get back from the api call
    const [productInfo, setProductInfo] = useState({})

    const history = useHistory();

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/products/${_id}`)
            .then(res=>{
                console.log("response-->", res)
                setProductInfo(res.data.results);
            })
            .catch(err=>console.log(err))
    }, [_id])

    //deleteProduct
    const deleteProduct = ()=>{
        axios.delete(`http://localhost:8000/api/products/${_id}`)
        .then(res=>{
            console.log("res-->", res)
            history.push("/")
        })
        .catch(err=>console.log(err))
    }

    return(
        <div>
            <h4>{productInfo.title}</h4>
            <p><strong>Price:</strong> ${productInfo.price}</p>
            <p><strong>Description: </strong>{productInfo.description}</p>
            <btn onClick={deleteProduct} className="btn btn-danger">Delete {productInfo.title}</btn>
        </div>
    );
};


export default OneProduct;