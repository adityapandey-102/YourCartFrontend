
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add } from './store/slices/feature/CartSlice';
import { addwish} from './store/slices/feature/wishListSlice';
import { CircularProgress } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

function ProductDeatail(props) {
    const product = useSelector(state => state.product.productsDetail)
    const ifLike = useSelector(state => state.wishlist.ItemsCount)
    const cartCount = useSelector(state => state.cart.ItemsCount)
    const navigate = useNavigate();

    useEffect(()=>{
        if(product.id===""){
            navigate("/dashboard")
        }
    },[])

    const dispatch = useDispatch();
    const [spinner, setSpinner] = useState(false);
    const [spinner2, setSpinner2] = useState(false);
    const handleAddCart = async () => {
        if (!cartCount[product.id]) {
            dispatch(add(product));
            setSpinner(true)
            const myTimeout = setTimeout(() => {
                setSpinner(false)
            }, 3000);

        }
        else {
            navigate("/cart")
        }
    }

    const handleLike = () => {

        if (!ifLike[product.id]) {
            dispatch(addwish(product))
            setSpinner2(true)
            const myTimeout = setTimeout(() => {
                setSpinner2(false)
            }, 3000);

        }
        else {
            navigate("/wishlist")
        }
        
    }

    const discounted_price = Math.round(product.price - (product.price * (product.discount_percentage / 100)))

    return (
        <>
            <div className='h-[100%] w-full flex flex-col items-center md:justify-center gap-y-4 '>
                <Link to={"/dashboard"} className='text-violet-800 text-2xl hover:text-violet-600 font-bold underline'>{" Go Back to Product Page"}</Link>
                <div className='card md:w-[75%] flex flex-col md:flex-row  border-2 border-slate-200 shadow-xl rounded'>
                    <div className='md:w-[40%]'>
                    <img className='h-[400px] w-[500px]  md:px-9 py-4 border-b-2 border-solid border-slate-200 bg-white cursor-pointer' src={product.image} alt="random" />
                    </div>
                    <div className='card-body flex flex-col md:w-[60%] items-center justify-between p-5 bg-violet-700 bg-gradient-to-br from-violet-700 to-pink-800 text-white' >
                        <h1 className='font-bold  md:text-xl'>{product.title}</h1>
                        <div className='text-center'>
                        <p className='text-lg'><span className='font-semibold'>Rs: </span>{discounted_price}<span className='text-xs'> <s>Rs.{product.price}</s></span><span className='text-red-500 text-xs font-bold'>{` (${product.discount_percentage}% OFF)`}</span></p>
                        <p>{product.description}</p>
                        <p className='text-xl'>{product.rating.rate} <span className='text-[#ef4444] text-2xl'>&#9733;</span> Rating</p>
                        </div>
                        
                        <div className='flex flex-col w-full items-center gap-y-3'>
                            <button onClick={handleAddCart} type='button' className='py-3 w-[50%] inline-block box-shadow bg-pink-500 rounded text-white hover:bg-pink-700 '>
                                {
                                    spinner ?
                                        <CircularProgress sx={{ "color": "white" }} />
                                        :
                                        (cartCount[product.id] ? <>Go To Cart</> : <>Add To Cart</>)
                                }
                            </button>
                            <button onClick={handleLike} type='button' className='py-3 w-[50%]  inline-block box-shadow bg-white rounded text-black hover:text-white hover:bg-pink-500 border-2 border-solid border-pink-700'>
                                {
                                    spinner2 ?
                                        <CircularProgress sx={{ "color": "white" }} />
                                        :
                                        (ifLike[product.id] ? <>Go To WishList</> : <>Move To WishList</>)
                                }
                            </button>
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}

export default ProductDeatail
