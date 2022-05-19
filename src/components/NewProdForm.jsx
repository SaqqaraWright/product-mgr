import React, {useState} from 'react';
import axios from 'axios';


const NewProdForm = (props)=>{

    let [title, setTitle] = useState("");
    let [price, setPrice] = useState("");
    let [description, setDescription] = useState("");

    //state variable to store validation errors inside of
    let [errors, setErrors] = useState({})

    //submitHandler
    const addProduct = (e) =>{
        e.preventDefault();

        //package up the state variables into an object
        let formInfo = {title, price, description}

        axios.post("http://localhost:8000/api/products", formInfo)
            .then(res=>{
                console.log("response after posting-->", res)

                // this "if statement" below means that if there are errors and validation errors that we need to save, then to save those validation errors into state
                if(res.data.error){
                    setErrors(res.data.error.errors);
                }
                else{ //"else statement" here means that there are no errors; therefore clear out the form
                setTitle("")
                setPrice("")
                setDescription("")

                props.setFormSubmitted(!props.setFormSubmitted)


                }
            })
            .catch(err=>console.log("errrr", err))
    }

    return(
        <div>
            <form onSubmit={addProduct} className="form-group">
                <div className="mb-3">
                    <label htmlFor="">Title:</label>
                    <input type="text" onChange={(e)=>setTitle(e.target.value)} value={title} className="form-control" />
                    <p className="text-danger">{errors.title?.message}</p> {/*In the error if statement, I am conditionally parsing through an object */}
                </div>
                <div className="mb-3">
                    <label htmlFor="">Price:</label>
                    <input type="number" onChange={(e)=>setPrice(e.target.value)} value={price} className="form-control" />
                    <p className="text-danger">{errors.price?.message}</p>
                </div>
                <div className="mb-3">
                    <label htmlFor="">Description:</label>
                    <input type="text" onChange={(e)=>setDescription(e.target.value)} value={description} className="form-control" />
                    <p className="text-danger">{errors.description?.message}</p>
                </div>
                <input type="submit" value="Add Product" className="btn btn-success"/>
            </form>
        </div>

    );
};

export default NewProdForm;