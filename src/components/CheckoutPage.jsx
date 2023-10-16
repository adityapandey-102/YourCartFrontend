import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../assets/CSS/cart.css';
import { Link, useNavigate } from 'react-router-dom';
import { getWishlist } from './store/slices/feature/wishListSlice';
import { getCartItems } from './store/slices/feature/CartSlice';
import { Helmet } from 'react-helmet';
import useToast from './custom hook/useToast';

function CheckoutPage() {
  const products = useSelector((state) => state.cart.cartItems);
  const productCount = useSelector((state) => state.cart.ItemsCount);
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const showToast=useToast()
  const host=import.meta.env.VITE_BASE_URL   
  // const host="http://localhost:5000/api"


  useEffect(()=>{
    if (!localStorage.getItem('token')) {
      navigate('/login')
    }
    else{
      if (products.length===0) {
        navigate("/cart")
      }
      dispatch(getWishlist());
      dispatch(getCartItems());
    }
  },[])
  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    email: '',
    contactNo:'',
  });

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

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress({
      ...shippingAddress,
      [name]: value,
    });
  };

  const openRazorpayInterface=(data)=>{
    const options={
    key: import.meta.env.VITE_KEY, 
    amount: Number(data.amount), 
    currency: data.currency,
    name: "Your Cart",
    description: "Test Transaction",
    order_id: data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    handler:async function (response){
        const result = await fetch(`${host}/checkoutPayment/verify`,{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
          body: JSON.stringify(response)
        })
        const verifyStatus= await result.json()
        if(verifyStatus.signatureIsValid==="true"){
          showToast("Payment Done successfully! Your order will ship XYZ days","success")
          navigate("/orderSummary")
        }
        else{
          showToast("Payment Unsuccessfull! Please Try Again","error")
        }
    },
    prefill: {
        name: shippingAddress.fullName,
        email: shippingAddress.email,
        contact: shippingAddress.contactNo
    },
    notes: {
        "address": shippingAddress.fullName+","+shippingAddress.address+","+shippingAddress.city+","+shippingAddress.postalCode,
    },
    theme: {
        color: "#940B92"
    }
    }
    const rzp = new window.Razorpay(options);
    rzp.open()
  }

  const handlePlaceOrder = async() => {
    // Here, you can implement your order placement logic, which may involve sending the order details to a server.
    // For this example, we'll simply log the shipping address and order details.
    // console.log('Shipping Address:', shippingAddress);
    // console.log('Order Details:', products);
    // console.log('Total Price:', price - discount + 40);
    const amountTotal=price - discount + 40
    if (shippingAddress.address.length >3 &&
      shippingAddress.postalCode.length >3 &&
      shippingAddress.contactNo.length >3 &&
      shippingAddress.fullName.length >3 &&
      shippingAddress.city.length >3 &&
      shippingAddress.email.length >3
      ) {
      const result = await fetch(`${host}/checkoutPayment/orders`,{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
          body: JSON.stringify({amountTotal})
        })
        const orderData= await result.json()
        openRazorpayInterface(orderData.data); 
    }
    else{
      showToast("Please make sure shipping address is filled completly","error")
    }
  };

  return (
    <>
    <Helmet>
      <title>Checkout Page</title>
    </Helmet>
      <div className="cartContainer md:grid flex flex-col md:mt-[100px]">
        <div className="flex flex-col w-[80%] gap-3 md:self-baseline">
          <h1 className="text-3xl font-bold">Items List ({products.length})</h1>
          {products.map((product) => {
            const discounted_price=Math.round(product.price-(product.price*(product.discount_percentage/100)))
            return <div key={product._id}  className='border-2 border-dashed border-violet-800 p-3 h-fit'>
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
          {/* Shipping Address Section */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold">Shipping Address</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={shippingAddress.fullName}
                  onChange={handleAddressChange}
                  required
                  className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Shipping Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={shippingAddress.email}
                  onChange={handleAddressChange}
                  required
                  className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="contactNo" className="block text-sm font-medium text-gray-700">
                  Contact Number
                </label>
                <input
                  type="text"
                  id="contactNo"
                  name="contactNo"
                  value={shippingAddress.contactNo}
                  onChange={handleAddressChange}
                  required
                  className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={shippingAddress.address}
                  onChange={handleAddressChange}
                  required
                  className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={shippingAddress.city}
                  onChange={handleAddressChange}
                  required
                  className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                  Postal Code
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={shippingAddress.postalCode}
                  onChange={handleAddressChange}
                  required
                  className="mt-1 p-2 w-full border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </form>
          </div>
          {/* End Shipping Address Section */}
          <button
            type="button"
            onClick={handlePlaceOrder}
            className="font-medium bg-violet-700 text-xl hover:bg-violet-800 text-white py-2"
          >
            Place Order
          </button>
          <Link
            to={"/"}
            type="button"
            className="font-medium  text-indigo-800 hover:text-indigo-500"
          >
            Continue Shopping
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </main>
      </div>
    </>
  );
}

export default CheckoutPage;
