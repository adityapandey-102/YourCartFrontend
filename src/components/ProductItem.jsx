import React, { useEffect,useRef } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add } from './store/slices/feature/CartSlice';
import { addwish, removeItem } from './store/slices/feature/wishListSlice';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { addProductDetail } from './store/slices/feature/ProductSlice';

function ProductItem(props) {
    const ifLike = useSelector(state => state.wishlist.ItemsCount)
    const cartCount = useSelector(state => state.cart.ItemsCount)
    const navigate=useNavigate();

    const dispatch = useDispatch();
    const { product } = props
    const [spinner, setSpinner] = useState(false);
    const handleAddCart =async() => {
        if (!cartCount[product.id]) {
            dispatch(add(product));
            setSpinner(true)
            const myTimeout = setTimeout(()=>{
                setSpinner(false)
            }, 3000);

        }
        else{
            navigate("/cart")
        }
    }

    const handleReadMore = () => {
        dispatch(addProductDetail(product))
        navigate("/productdetails")
    }
    const handleLike = () => {
        if (ifLike[product.id]) {
            dispatch(removeItem(product))
        }
        else {
            dispatch(addwish(product))
        }
    }

    const discounted_price = Math.round(product.price - (product.price * (product.discount_percentage / 100)))

    return (
        <>
            <div className='card border-2 border-slate-200 shadow-xl rounded relative text-center highlightBox' style={{ "width": "350px", "height": "375px", "overflow": "hidden" }} >
                <img width="35" onClick={handleLike} height="35" className='absolute top-1 right-1 cursor-pointer shadow-3xl rounded-full bg-white' src={ifLike[product.id] ? "https://img.icons8.com/color/48/filled-like.png" : "https://img.icons8.com/ios/50/hearts--v1.png"} alt="hearts--v1" />
                <img onClick={handleReadMore} className='h-[200px] px-16 md:px-9 py-1 w-full border-b-2 border-solid border-slate-200 bg-white cursor-pointer' src={product.image} alt="random" />
                <div className='card-body space-y-1 p-3 absolute top-[200px] hover:top-[150px] hover:border-t-2 border-solid border-slate-200  bg-white transition-effect' >
                    <p className='font-bold  md:text-xl'>{product.title.slice(0, 25)}...</p>
                    <p className='text-lg'><span className='font-semibold'>Rs: </span>{discounted_price}<span className='text-xs'> <s>Rs.{product.price}</s></span><span className='text-red-500 text-xs font-bold'>{` (${product.discount_percentage}% OFF)`}</span></p>
                    <p>{product.description.slice(0, 55)}.....</p>
                    <p className='text-xl'>{product.rating.rate} <span className='text-[#ef4444] text-2xl'>&#9733;</span> Rating</p>
                    <div className='flex justify-center mt-4'>
                        <button onClick={handleAddCart} type='button' className='py-3 w-[90%] inline-block box-shadow bg-violet-600 rounded text-white hover:bg-violet-800 '>   
                        {
                            spinner?
                            <CircularProgress sx={{"color":"white"}}/>
                            :
                            (cartCount[product.id] ?<>Go To Cart</>:<>Add To Cart</>)
                        }
                        </button>
                    </div>
                </div>

            </div>
        </>
    )
}

export default ProductItem
