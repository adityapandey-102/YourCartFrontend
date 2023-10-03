import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../assets/CSS/cart.css';
import { Link } from 'react-router-dom';

function CheckoutPage() {
  const products = useSelector((state) => state.cart.cartItems);
  const productCount = useSelector((state) => state.cart.ItemsCount);
  const dispatch = useDispatch();
  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const item_price = () => {
    let count = 0;
    products.forEach((item) => {
      count += item.price * productCount[item.id];
    });
    return count;
  };

  const price = item_price();

  const item_discount = () => {
    let count_discount = 0;
    products.forEach((item) => {
      count_discount +=
        (item.price * (item.discount_percentage / 100)) * productCount[item.id];
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

  const handlePlaceOrder = () => {
    // Here, you can implement your order placement logic, which may involve sending the order details to a server.
    // For this example, we'll simply log the shipping address and order details.
    console.log('Shipping Address:', shippingAddress);
    console.log('Order Details:', products);
    console.log('Total Price:', price - discount + 40);
  };

  return (
    <>
      <div className="cartContainer md:grid flex flex-col md:mt-[100px]">
        <div className="flex flex-col w-[80%] gap-3 self-baseline">
          <h1 className="text-3xl font-bold">Items List ({products.length})</h1>
          {products.map((product) => {
            const discounted_price=Math.round(product.price-(product.price*(product.discount_percentage/100)))
            return <div key={product.id}  className='border-2 border-dashed border-violet-800 p-3 h-fit'>
                <p className='font-bold  md:text-xl'>{product.title}</p> 
                <p className='font-semibold'>({productCount[product.id]} &times; {discounted_price} )</p>
            </div>;
          })}
        </div>

        <main class="cart__sumary-content p-8 flex flex-col gap-y-3 w-[80%] box-shadow">
          <header class="font-bold">Price Details</header>
          <hr className="border-solid border-black" />
          <div class="order-data flex justify-between">
            <p>Price({products.length} items)</p>
            <p>Rs. {price}</p>
          </div>
          <div class="order-data flex justify-between">
            <p>Discount</p>
            <p>– Rs. {discount}</p>
          </div>
          <div class="order-data flex justify-between">
            <p>Delivery Charges</p>
            <p>Rs. 40</p>
          </div>
          <hr className="border-solid border-black" />
          <div class="order-data flex justify-between font-bold text-2xl">
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
              <div className="mb-4">
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={shippingAddress.country}
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
