import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CartItem from './CartItem';
import '../assets/CSS/cart.css'
import { Link } from 'react-router-dom';

function Cart() {
  const products = useSelector(state => state.cart.cartItems)
  const productCount = useSelector(state => state.cart.ItemsCount)
  const dispatch = useDispatch();
  const item_price=()=>{
    let count=0;
    products.forEach(item => {
      count+=(item.price*productCount[item.id])
    });
    return count;
  }
  const price=item_price()
  const item_discount=()=>{
    let count_discount=0;
    products.forEach(item => {
      count_discount+=((item.price*(item.discount_percentage/100))*productCount[item.id])
    });
    return Math.round(count_discount);
  }
  const discount=item_discount();

  return (<>

  {products.length===0?<>
  <div className='mt-14 flex items-center flex-col text-center'>
    <img className='w-[35vh] h-[25vh] md:w-[70vh] md:h-[40vh] my-3' src="src\assets\empty-cart.png" alt=""/>
    <h1 className='text-4xl text-indigo-500 font-medium mb-2'>Your Cart is Empty</h1>
    <p className='md:text-xl font-medium px-5'>Add Something <span className='text-red-600 font-semibold'>Amazing</span> and <span className='text-red-500 font-semibold'>Awesome</span> products to your cart.</p>
    <Link to={"/"} type='button' className='px-9 py-4 bg-red-500 rounded-md mt-7 font-semibold text-white'>Go To HomePage</Link>
  </div>
  </>:



    <>
    <div className="cartContainer md:grid flex flex-col">
      <div className="flex flex-row gap-y-6 flex-wrap pt-7 w-[80%] mt-14 overflow-y-scroll h-[90vh] overFlowScroll justify-center" >
      <h1 className='text-3xl font-bold' >My Cart ({products.length})</h1>

        {
          products.map((product) => {
            return <CartItem key={product.id} product={product} quantity={productCount[product.id]} />
          })
        }
      </div>

          <main class="cart__sumary-content p-8 flex flex-col gap-y-3 w-[80%] box-shadow">
            <header class="font-bold">Price Details</header>
            <hr className='border-solid border-black'/>
            <div class="order-data flex justify-between">
              <p>Price({products.length} items)</p><p>Rs. {price}</p>
            </div>
            <div class="order-data flex justify-between">
              <p >Discount</p>
              <p >– Rs. {discount}</p>
            </div>
            <div class="order-data flex justify-between">
              <p>Delivery Charges</p>
              <p >Rs. 40</p>
            </div>
            <hr className='border-solid border-black' />
            <div class="order-data flex justify-between font-bold text-2xl">
              <p>Total Amount</p>
              <p>Rs . {(price-discount)+40}</p>
            </div>
            <hr className='border-solid border-black' />
            <p>You Will Save Rs. 200 on this Order</p>
            <Link to={'/checkoutpage'} type="button" className="font-medium bg-violet-700 text-xl hover:bg-violet-800 text-white py-2 ">
              Proceed To Checkout
            </Link>
            <Link to={"/"} type="button" className="font-medium  text-indigo-800 hover:text-indigo-500">
              Continue Shopping
              <span aria-hidden="true"> &rarr;</span>
            </Link>
          </main>
    </div>
    </>}
    </>
  )
}

export default Cart
