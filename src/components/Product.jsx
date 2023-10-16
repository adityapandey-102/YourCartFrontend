import React from 'react'
import { useState, useEffect } from 'react'
import ProductItem from './ProductItem';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from './store/slices/feature/ProductSlice';
import { addFilterProducts } from './store/slices/feature/FilterSlice';
import Loader from './Loader';
import { getWishlist } from './store/slices/feature/wishListSlice';
import { getCartItems } from './store/slices/feature/CartSlice';
import { Helmet } from 'react-helmet';

function Product() {
    const dispatch = useDispatch()
    const products = useSelector(state => state.filter.filterProduct)

    const [loading,setLoading]= useState(false)

    useEffect(() => {
        setLoading(true)
        if (products.length === 0) {
            dispatch(getProducts())
                .then((data) => {

                    // Dispatch the addFilterProducts action with the data obtained from getProducts
                    const isData=dispatch(addFilterProducts(data.payload))
                        // if (isData.payload.length!==0) {
                        //     setLoading(false)                            
                        // }
                        setTimeout(()=>{
                            setLoading(false) 
                        },4000)
                                                   
                })
                .catch((error) => {
                    // Handle any errors here
                    console.error('Error fetching products:', error);
                });
                dispatch(getWishlist());
                dispatch(getCartItems());
        }
        else{
            setTimeout(()=>{
                setLoading(false) 
            },4000)
        }
        

    }, []);



    return (
        <>
        <Helmet>
            <title>Product Dashboard</title>
        </Helmet>
        {loading ? <Loader/>:
            <div className="product-box flex flex-row flex-wrap md:overflow-y-scroll gap-x-4 justify-center md:h-[750px] gap-y-6 pt-7 mt-14" >
                { products &&
                    products.map((product) => {
                        return <ProductItem key={product._id} product={product} />
                    })
                }
            </div>
}

        </>
    )
}

export default Product
