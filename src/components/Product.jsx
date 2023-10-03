import React from 'react'
import { useState, useEffect } from 'react'
import ProductItem from './ProductItem';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from './store/slices/feature/ProductSlice';
import { addFilterProducts } from './store/slices/feature/FilterSlice';

function Product() {
    const dispatch = useDispatch()
    const products = useSelector(state => state.filter.filterProduct)

    useEffect(() => {
        if (products.length === 0) {
            dispatch(getProducts())
                .then((data) => {

                    // Dispatch the addFilterProducts action with the data obtained from getProducts
                    dispatch(addFilterProducts(data.payload));
                })
                .catch((error) => {
                    // Handle any errors here
                    console.error('Error fetching products:', error);
                });
        }

    }, []);



    return (
        <>
            <div className="product-box flex flex-row flex-wrap md:overflow-y-scroll gap-x-4 justify-center md:h-[750px] gap-y-6 pt-7 mt-14" >
                {
                    products.map((product) => {
                        return <ProductItem key={product.id} product={product} />
                    })
                }
            </div>

        </>
    )
}

export default Product
