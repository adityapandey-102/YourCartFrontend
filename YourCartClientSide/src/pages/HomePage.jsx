import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Categories from '../components/Categories'
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../components/store/slices/feature/ProductSlice';
import { addFilterProducts } from '../components/store/slices/feature/FilterSlice';
import { getWishlist } from '../components/store/slices/feature/wishListSlice';
import { getCartItems } from '../components/store/slices/feature/CartSlice';
import { Helmet } from 'react-helmet';


function HomePage() {
  const dispatch = useDispatch()
  const main = useSelector(state => state.product.productData)
  let navigate = useNavigate();



  useEffect(() => {

    if (localStorage.getItem('token')) {
      dispatch(getProducts())
        .then((data) => {
          // Dispatch the addFilterProducts action with the data obtained from getProducts
          dispatch(addFilterProducts(data.payload));
        })
        .catch((error) => {
          // Handle any errors here
          console.error('Error fetching products:', error);
        });
      dispatch(getWishlist())
      dispatch(getCartItems())
      
    }
    else {
      navigate('/login')
    }
  }, []);
 
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>YourCart-We Provide Best Products</title>
        <meta name="description" content="Ecommerce" />
      </Helmet>
      <div className='bg-gradient-to-br from-violet-700 to-pink-800 py-4 px-2 md:py-10 md:px-20 w-full flex md:items-center md:justify-center text-white flex flex-row'>
        <div className='flex flex-col md:px-20'>
          <h1 className='text-2xl md:text-5xl font-semibold'>Here we provide best exclusive product.</h1>
          <p className='mt-5 text-sm md:text-lg'>Buy an Amazing and Awesome product. We provide you here a best services and quality.  </p>
          <div className="flex gap-x-3">
            <Link to={"/dashboard"} type='button' className='px-2 py-2 md:px-9 md:py-4 bg-violet-600 hover:bg-white hover:text-violet-800 hover:border-2 hover:border-solid hover:border-violet-700 rounded-md mt-7 font-bold text-white text-sm md:text-lg'>Checkout All Products</Link>
            <Link to={"/signup"} type='button' className='px-2 py-2 md:px-9  md:py-4 bg-white hover:bg-violet-600 bg-white text-violet-800 border-2 border-solid border-violet-700 rounded-md mt-7 font-bold hover:text-white text-sm md:text-lg'>Create An Account</Link>
          </div>
        </div>
        <div className='w-[300px] md:w-fit'>
          <img src="/homepage.png" className='w-[250px] h-[200px] md:w-[50vh] md:h-[50vh] my-3 ' alt="" />
        </div>
      </div>
      <h1 className='text-center font-bold text-3xl mt-10'>Category List</h1>
      <p className='text-center'>You can shop from our shop`s different category list.</p>
      <Categories />
      <footer className='text-center text-white bg-blue-950 w-full py-20'>
        <p>An Ecommerce Platform built by @Aditya Pandey</p>
      </footer>
    </>
  )
}

export default HomePage
