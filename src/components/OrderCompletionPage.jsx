import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../assets/CSS/cart.css';
import { Link, useNavigate } from 'react-router-dom';
import { getWishlist } from './store/slices/feature/wishListSlice';
import { getCartItems, removeAllItemsFromCart, removeCartItem } from './store/slices/feature/CartSlice';
import { Helmet } from 'react-helmet';
import useCountDown from './custom hook/useCountDown';
import { CircularProgress } from '@mui/material';


function OrderCompletionPage(props) {
  const products = useSelector((state) => state.cart.cartItems);
  const productCount = useSelector((state) => state.cart.ItemsCount);
  const dispatch= useDispatch();
  const navigate=useNavigate();
  const [spinner, setSpinner] = useState(false);


  const {secondLeft,start}=useCountDown()

  useEffect(()=>{
    if (!localStorage.getItem('token')) {
      navigate('/login')
    }
    else{
      dispatch(getWishlist());
      dispatch(getCartItems());
    }
    start(11)
    
  },[])

 
  const item_price = () => {
    let count = 0;
    products.forEach((item) => {
      count += item.price * productCount[item._id];
    });
    return count;
  };

  const price = item_price();

  const item_discount = () => {
    let count_discount = 0;
    products.forEach((item) => {
      count_discount +=
        (item.price * (item.discount_percentage / 100)) * productCount[item._id];
    });
    return Math.round(count_discount);
  };

  const discount = item_discount();
  const handleCartEmpty=()=>{
    dispatch(removeAllItemsFromCart())
      navigate("/")
  }

  if (secondLeft===1) {
    setTimeout(()=>{

      handleCartEmpty()    
    },1000)


  }
 

  return (
    <>
    <>
    <Helmet>
      <title>Order Summary</title>
    </Helmet>
    </>
    {spinner ?<CircularProgress sx={{ "color": "black" }} /> :
    <>
      <div className="cartContainer md:grid flex flex-col md:mt-[100px]">
        <div className="flex flex-col w-[80%] gap-3 md:self-baseline">
          <h1 className="text-3xl font-bold">Items List ({products.length})</h1>
          {products.map((product) => {
            const discounted_price=Math.round(product.price-(product.price*(product.discount_percentage/100)))
            return <div key={product._id}  className='highlightBox box-shadow bg-green-600 p-3 h-fit text-white'>
                <p className='font-bold  md:text-xl'>{product.title}</p> 
                <p className='font-semibold'>({productCount[product._id]} &times; {discounted_price} )</p>
            </div>;
          })}
        </div>

        <main className="cart__sumary-content p-8 flex flex-col gap-y-3 w-[80%] box-shadow">
          <header className="font-bold">Price Details</header>
          <hr className="border-solid border-black" />
          <div className="order-data flex justify-between">
            <p>Price({products.length} items)</p>
            <p>Rs. {price}</p>
          </div>
          <div className="order-data flex justify-between">
            <p>Discount</p>
            <p>– Rs. {discount}</p>
          </div>
          <div className="order-data flex justify-between">
            <p>Delivery Charges</p>
            <p>Rs. 40</p>
          </div>
          <hr className="border-solid border-black" />
          <div className="order-data flex justify-between font-bold text-2xl">
            <p>Total Amount</p>
            <p>Rs . {(price - discount) + 40}</p>
          </div>
          <hr className="border-solid border-black" />
          <p>You Will Save Rs. 200 on this Order</p>

          <Link
            to={"/dashboard"}
            type="button"
            className="font-medium  text-indigo-800 hover:text-indigo-500"
          >
            Continue Shopping
            <span aria-hidden="true"> &rarr;</span>
          </Link>
          <a href="#">will redirect in {secondLeft} sec</a>
        </main>
      </div>
      </>}
    </>
  );
}

export default OrderCompletionPage;
