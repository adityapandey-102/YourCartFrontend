import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleClear, setPriceRange, setSorting, sethandleCategory, sethandleRating } from './store/slices/feature/FilterSlice';


function Filter() {
    const category= useSelector(state=>state.filter.categories)
    // const completeData=useSelector(state=>state.product.productData)
    const priceRange=useSelector(state=>state.filter.priceRange)
    const rating=useSelector(state=>state.filter.rating)
    const sorting=useSelector(state=>state.filter.sortingTechnique)
    // const radioClear=useSelector(state=>state.filter.radioClear)
    const dispatch=useDispatch();

    const handleCategory=(e)=>{
        const updatedCategory = { ...category };
        updatedCategory[e.target.name] = e.target.checked;        
        dispatch(sethandleCategory(updatedCategory))
        dispatch(setPriceRange(priceRange))
        dispatch(sethandleRating(rating))
        dispatch(setSorting(sorting))


    }

    const handlePriceRange=(e)=>{
        dispatch(setPriceRange(Number(e.target.value)))

    }

    const handleRating=(e)=>{
        dispatch(sethandleRating(Number(e.target.value)))
    }

    const handleSorting=(e)=>{
        dispatch(setSorting(e.target.value))
    }

    const ClearFilter=()=>{
        dispatch(handleClear())
    }

    return (
        <div className='bg-white w-[100%] h-[100%] text-black px-7'>
            <div className="flex justify-between items-center p-4">
                <p className="font-bold text-3xl">Filters</p>
                <p className=" cursor-pointer" onClick={ClearFilter}>Clear</p>
            </div>
            <div className="list__sort-container flex flex-col gap-y-3 border-y-2 border-solid border-white py-5">
                <h2 className='text-2xl font-bold'>Sort By:</h2>
                <label className="radio" htmlFor="item-1">
                    <input type="radio"  onChange={handleSorting} name="item1" id="item-1" className="radio__input" key="PriceLowToHigh" value="PriceLowToHigh" />
                    Price - Low to High
                </label>
                <label className="radio" htmlFor="item-2">
                    <input type="radio" onChange={handleSorting}  name="item1" id="item-2" className="radio__input" key="PriceHighToLow" value="PriceHighToLow" />
                    Price - High to Low
                </label>
                <label className="radio" htmlFor="item-3">
                    <input type="radio"  onChange={handleSorting}  name="item1" id="item-3" className="radio__input" key="RatingLowToHigh" value="RatingLowToHigh" />
                    Ratings - Low to High
                </label>
                <label className="radio" htmlFor="item-4">
                    <input type="radio"  onChange={handleSorting}  name="item1" id="item-4" className="radio__input" key="RatingHighToLow" value="RatingHighToLow" />
                    Ratings - High to Low
                </label>
            </div>

            <div className="price-range-slider flex flex-col gap-y-3 border-y-2 border-solid border-white py-5">
            <h2 className='text-2xl font-bold'>Price Range:</h2>
                <div className="centered-row flex flex-row text-2xl justify-between"><p className="f-6">1000</p><p className="f-6">2500</p><p className="f-6">50000</p></div>
                <div className="component-border ">
                    <input type="range" min="1000" max="50000" onChange={handlePriceRange} value={priceRange} aria-label="input-range-slider" step="100" className="custom-range w-full" id="volume" name="volume" />
                        <p className="f-5 f-bold center-text">Show Products below : Rs <span className="t-c-3">{priceRange}</span></p>
                </div>
            </div>

            <div className="position-checkbox component-border flex flex-col gap-y-3 py-5 border-y-2 border-solid border-white  ">
                <h2 className='text-2xl font-bold'>Category</h2>
                {/* <label htmlFor="checkbox-1" className="checkbox checkbox__label">
                    <input className="checkbox__input" onChange={handleCategory} type="checkbox" id="checkbox-1" name="outOfStock" />
                    Include Out Of Stock
                </label>
                <label htmlFor="checkbox-2" className="checkbox checkbox__label">
                    <input className="checkbox__input" onChange={handleCategory} type="checkbox" id="checkbox-2" name="fastDelivery" />
                    Fast Delivery Only
                </label> */}
                <label htmlFor="checkbox-3" className="checkbox checkbox__label">
                    <input className="checkbox__input" onChange={handleCategory}  type="checkbox" checked={category.books} id="checkbox-3" name="books" />
                    Books
                </label>
                <label htmlFor="checkbox-4" className="checkbox checkbox__label">
                    <input className="checkbox__input" onChange={handleCategory} type="checkbox" checked={category.mens_clothing} id="checkbox-4" name="mens_clothing" />
                    Men`s Clothings
                </label>
                <label htmlFor="checkbox-5" className="checkbox checkbox__label">
                    <input className="checkbox__input" onChange={handleCategory} type="checkbox" checked={category.electronics} id="checkbox-5" name="electronics" />
                    Electronics
                </label>
                <label htmlFor="checkbox-6" className="checkbox checkbox__label">
                    <input className="checkbox__input" onChange={handleCategory} type="checkbox" checked={category.smartphones} id="checkbox-6" name="smartphones" />
                    Smartphones
                </label>
                <label htmlFor="checkbox-7" className="checkbox checkbox__label">
                    <input className="checkbox__input" onChange={handleCategory} type="checkbox" checked={category.Shoes_for_Men} id="checkbox-7" name="Shoes_for_Men" />
                    Shoes for Men
                </label>
            </div>

            <div className="list__sort-container flex flex-col gap-y-3 border-y-2 border-solid border-white py-5">
                <h2 className='text-2xl font-bold'>Rating:</h2>
                <label className="radio" htmlFor="item-1">
                    <input type="radio"  onChange={handleRating} name="item" id="item-9" className="radio__input" value="4" />
                    4 star & above
                </label>
                <label className="radio" htmlFor="item-2">
                    <input type="radio" onChange={handleRating} name="item" id="item-8" className="radio__input" value="3" />
                    3 star & above
                </label>
                <label className="radio" htmlFor="item-3">
                    <input type="radio" onChange={handleRating} name="item" id="item-7" className="radio__input" value="2" />
                    2 star & above
                </label>
                <label className="radio" htmlFor="item-4">
                    <input type="radio" onChange={handleRating} name="item" id="item-6" className="radio__input" value="1" />
                    1 star & above
                </label>
            </div>




        </div>
    )
}

export default Filter
