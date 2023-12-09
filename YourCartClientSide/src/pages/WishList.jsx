import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import WishListItems from '../components/WishListItems'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { getWishlist } from '../components/store/slices/feature/wishListSlice'
import { getCartItems } from '../components/store/slices/feature/CartSlice'
import { Helmet } from 'react-helmet'

function WishList() {
    const wishlist = useSelector(state => state.wishlist.wishListItems)
    let navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => {
  
      if (!localStorage.getItem('token')) {
        navigate('/login')
      }
      else{
        dispatch(getWishlist())
        dispatch(getCartItems())
      }
      
    }, []);
    return (

        <>
        <Helmet>
            <title>Wishlist Page</title>
        </Helmet>
            {wishlist.length === 0 ?
                <>
                    <div className='mt-14 flex items-center flex-col text-center'>
                        <img className='w-[35vh] h-[25vh] md:w-[70vh] md:h-[40vh] my-3' src="/empty-cart.png" alt="" />
                        <h1 className='text-4xl text-indigo-500 font-medium mb-2'>Your WishList is Empty!</h1>
                        <p className='md:text-xl font-medium px-5'>Add your favourate <span className='text-red-600 font-semibold'>Amazing</span> and <span className='text-red-500 font-semibold'>Awesome</span> products to your WishList, so you can buy it later.</p>
                        <Link to={"/"} type='button' className='px-9 py-4 bg-red-500 rounded-md mt-7 font-semibold text-white'>Go To HomePage</Link>
                    </div>
                </> :
                <>
                    <div className="flex flex-row gap-y-6  gap-x-5 justify-center flex-wrap pt-7 w-[100%] md:mt-14 overflow-y-scroll h-[90vh] overFlowScroll justify-center" >
                        <h1 className='text-3xl text-center font-bold md:w-[100%]' >My WishList ({wishlist.length})</h1>

                        {
                            wishlist.map((product) => {
                                return <WishListItems key={product._id} product={product} />
                            })
                        }
                    </div>
                </>
            }
        </>
    )
}

export default WishList
