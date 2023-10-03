import './App.css'
import React, { useState } from 'react';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import Dashboard from './components/Dashboard';
import { Provider } from 'react-redux';
import store from './components/store/store';
import WishList from './components/WishList';
import HomePage from './components/HomePage';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ProductDeatail from './components/ProductDeatail';
import CheckoutPage from './components/CheckoutPage';

function App() {
  const [open, setOpen] = useState(false)

  return (
    <>
    <Provider store={store}>
    <BrowserRouter>
    <Navbar setOpen={setOpen}/>
    <Routes>
      <Route path={"/"} element={<HomePage/>} />
      <Route path={"/dashboard"} element={<Dashboard open={open} setOpen={setOpen}/>} />
      <Route path={"/cart"} element={<Cart/>} />
      <Route path={"/login"} element={<Login/>} />
      <Route path={"/signup"} element={<SignUp/>} />
      <Route path={"/wishlist"} element={<WishList/>} />
      <Route path={"/checkoutpage"} element={<CheckoutPage/>} />
      <Route path={"/productdetails"} element={<ProductDeatail/>} />
      <Route exact path={"/category/electronics"} element={<Dashboard key={"electronics"}/>} />
      <Route exact path={"/category/mens_wear"} element={<Dashboard key={"mens_wear"}/>} />
      <Route exact path={"/category/books"} element={<Dashboard key={"books"}/>} />
      <Route exact path={"/category/shoes_for_mens"} element={<Dashboard key={"shoes_for_mens"}/>} />
      <Route exact path={"/category/smartphones"} element={<Dashboard key={"smartphones"}/>} />
    </Routes>
    </BrowserRouter>
    </Provider>
   
    </>
  )
}

export default App