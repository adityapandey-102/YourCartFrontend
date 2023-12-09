import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeCartItem, decreaseItemCount, increaseItemCount } from './store/slices/feature/CartSlice';
import { addwish, removeItem } from './store/slices/feature/wishListSlice';
import { CircularProgress } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import useToast from '../custom hook/useToast';
function CartItem(props) {
    const { product, quantity } = props;
    const dispatch = useDispatch();
    const ifLike = useSelector(state => state.wishlist.ItemsCount)
    const navigate = useNavigate();
    const showToast=useToast()

    const [spinner2, setSpinner2] = useState(false);

    const handleRemoveItem = (product) => {
        dispatch(removeCartItem(product));
    }
    const handleMoveToWishlist = (product) => {

        if (!ifLike[product._id]) {
            dispatch(addwish(product))
        }
        dispatch(removeCartItem(product));
            setSpinner2(true)
            const myTimeout = setTimeout(() => {
                setSpinner2(false)
            }, 3000);
        showToast("Product added to wishlist! You can buy it later.","success")
    }

    const handleReadMore = () => {
        console.log("checkDetails");
    }
    const discounted_price = Math.round(product.price - (product.price * (product.discount_percentage / 100)))
    return (
        <>
            <div className='card h-auto md:h-[350px] items-center justify-center flex flex-col md:flex-row w-[100%] border-2 border-slate-200 shadow-xl rounded text-center'>
                <img onClick={handleReadMore} className='h-[300px] md:ml-4 py-4  w-full border-2 border-solid border-slate-200 bg-white cursor-pointer' src={product.image} alt="random" />
                <div className='card-body w-full space-y-2 p-3  border-solid border-slate-200  bg-white transition-effect' >
                    <p className='font-bold  md:text-xl'>{product.title}</p>
                    <p className='text-lg'><span className='font-bold'>Rs: </span>{discounted_price}<span className='text-sm'> <s>Rs.{product.price}</s></span><span className='text-red-500 text-sm font-bold'>{` (${product.discount_percentage}% OFF)`}</span></p>

                    <p className='text-xl'>{product.rating.rate} <span className='text-[#ef4444] text-2xl'>&#9733;</span> Rating</p>
                    <h3>Quantity:</h3>
                    <div className='flex justify-center items-center'>
                        <button onClick={() => dispatch(increaseItemCount(product))} type='button' className='px-3 inline-block box-shadow rounded text-black border-2 border-black border-solid font-bold '>+</button>
                        <span className='px-3'>{quantity}</span>
                        <button onClick={() => {
                            if (quantity>1) {
                                
                                dispatch(decreaseItemCount(product))
                            }
                        }} type='button' className='px-3 inline-block box-shadow rounded text-black  text-black border-2 border-black border-solid font-bold '>-</button>
                    </div>
                    <div className='flex justify-center items-center flex-col mt-4 gap-y-2'>
                        <button onClick={() => handleMoveToWishlist(product)} type='button' className='py-2 w-[90%] inline-block box-shadow bg-red-600 rounded text-white hover:bg-red-800 '>{
                            spinner2 ?
                                <CircularProgress sx={{ "color": "white" }} />
                                :
                                 <>Move To WishList</>
                        }</button>
                        <button onClick={() => handleRemoveItem(product)} type='button' className='py-2 w-[90%] inline-block box-shadow border-2 border-solid border-red-500 rounded text-black hover:text-white hover:bg-red-600 '>Remove From Cart</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartItem
