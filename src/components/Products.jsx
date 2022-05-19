import React, {useState, useEffect} from 'react';
import axios from 'axios';
import{Link} from "react-router-dom"


const Products = (props) => {

    const [allProducts, setAllProducts] = useState([]) //this allows me to save all variables

    const  [deleteToggle, setDeleteToggle] = useState(false)
    useEffect(()=>{
        axios.get("http://localhost:8000/api/products")
        .then(res=>{
            // console.log("response:", res)
            setAllProducts(res.data.results);
        })
        .catch(err=>{
            console.log("errrr", err)
        })
    }, [deleteToggle, props.formSubmitted])
    const deleteProduct = (_id)=>{
        console.log("deleting...")
        axios.delete(`http://localhost:8000/api/products/${_id}`)
            .then(res=>{
                console.log("res after deleting!", res);
                setDeleteToggle(!deleteToggle)
            })
            .catch(err=>console.log(err))
        
    }
        
    
    return (
        <div>
            <h2>All Products:</h2>
            {
                allProducts.map((productObj, idx)=>{
                    return(
                        
                        <div key={productObj._id} className="mb-3 border border-dark">
                            <Link to={`/products/${productObj._id}`}>{productObj.title}</Link>
                            <p><Link className="btn btn-info mt-2" to={`/edit/${productObj._id}`}>Edit {productObj.title}</Link></p>
                            <button onClick={(e)=>{deleteProduct(productObj._id)}} className="btn btn-danger">Delete {productObj.title}</button>
                        </div>
                    );
                })
            }
        </div>
    );
};

export default Products;