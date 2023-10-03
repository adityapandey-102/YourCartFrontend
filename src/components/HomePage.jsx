import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Categories from './Categories'
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from './store/slices/feature/ProductSlice';
import { addFilterProducts } from './store/slices/feature/FilterSlice';
function HomePage() {
    const dispatch =useDispatch()

    useEffect(() => {
        dispatch(getProducts())
          .then((data) => {

            // Dispatch the addFilterProducts action with the data obtained from getProducts
            dispatch(addFilterProducts(data.payload));
          })
          .catch((error) => {
            // Handle any errors here
            console.error('Error fetching products:', error);
          });
      },[]);
  return (
    <>
    <div className='bg-gradient-to-br from-violet-700 to-pink-800 py-10 px-20 w-full flex items-center justify-center text-white'>
        <div className='flex flex-col px-20'>
            <h1 className='text-5xl font-semibold'>Here we provide best exclusive product.</h1>
            <p className='mt-5'>Buy an Amazing and Awesome product. We provide you here a best services and quality.  </p>
            <div className="flex gap-x-3">
            <Link to={"/dashboard"} type='button' className='px-9 py-4 bg-violet-600 hover:bg-white hover:text-violet-800 hover:border-2 hover:border-solid hover:border-violet-700 rounded-md mt-7 font-bold text-white'>Go To HomePage</Link>
            <Link to={"/signup"} type='button' className='px-9  py-4 bg-white hover:bg-violet-600 hover:bg-white text-violet-800 border-2 border-solid border-violet-700 rounded-md mt-7 font-bold hover:text-white'>Create An Account</Link>
            </div>
        </div>
        <div>
            <img src="src\assets\homepage.png" className='w-[35vh] h-[25vh] md:w-[50vh] md:h-[50vh] my-3' alt="" />
        </div>
    </div>
    <h1 className='text-center font-bold text-3xl mt-10'>Category List</h1>
    <p className='text-center'>You can shop from our shop`s different category list.</p>
    <Categories/>
    <footer className='text-center text-white bg-blue-950 w-full py-20'>
        <p>An Ecommerce Platform built by @Aditya Pandey</p>
    </footer>
    </>
  )
}

export default HomePage
