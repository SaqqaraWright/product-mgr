import './App.css';
import React, {useState} from 'react';
import{
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom"
import Products from "./components/Products"
import NewProdForm from "./components/NewProdForm"
import OneProduct from './components/OneProduct';
import EditProduct from './components/EditProduct';

function App() {

  const [formSubmitted, setFormSubmitted] = useState(false);
  return (
    <BrowserRouter>
      <div className="App container">
        <h1>Product Manager</h1>
        <Switch>
          <Route exact path="/">
            <NewProdForm formSubmitted={formSubmitted} setFormSubmitted={setFormSubmitted}></NewProdForm>
            <hr/>
            <Products formSubmitted={formSubmitted}></Products>
          </Route>
          <Route exact path="/products/:_id">
            <OneProduct></OneProduct>
          </Route>
          <Route exact path="/edit/:_id">
            <EditProduct></EditProduct>
          </Route>

        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
