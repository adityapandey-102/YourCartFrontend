import React from 'react'
import { Link} from 'react-router-dom'
import { useDispatch,useSelector} from 'react-redux'
import {sethandleCategory} from './store/slices/feature/FilterSlice';




function Categories() {
    // const category= useSelector(state=>state.filter.categories)
    const dispatch=useDispatch();
    const handleCategory=(categoryName)=>{
        const updatedCategory = {Shoes_for_Men: false,
            smartphones: false,
            electronics: false,
            mens_clothing: false,
            books: false,};
        updatedCategory[categoryName] = true;   
        dispatch(sethandleCategory(updatedCategory))
    }


  return (
    <div className='flex flex-wrap gap-x-6 justify-between items-center px-11 py-14'>
      <Link to={"/category/books"} className=''   >
        <div onClick={()=>handleCategory('books')} className='p-2 box-shadow highlightBox'>
        <img src="/books.jpg" alt="" className='w-[250px] h-[250px]  border-2 border-solid border-slate-200' />
        <h1 className='text-xl font-semibold text-center'>Books</h1>
        </div>
      </Link>
      <Link to={"/category/mens_wear"} >
        <div onClick={()=>handleCategory('mens_clothing')}  className='p-2 box-shadow highlightBox' >
        <img src="/mensClothing.jpg" alt="" className='w-[250px] h-[250px]  border-2 border-solid border-slate-200' />
        <h1 className='text-xl font-semibold text-center'>MENS Wear</h1>
        </div>
      </Link>
      <Link to={"/category/electronics"}>
        <div  onClick={()=>handleCategory('electronics')}  className='p-2 box-shadow highlightBox' >
        <img src="/electronics.jpg" alt="" className='w-[250px] h-[250px]  border-2 border-solid border-slate-200' />
        <h1 className='text-xl font-semibold text-center'>Electronic Gadgets</h1>
        </div>
      </Link>
      <Link to={"/category/shoes_for_mens"}>
        <div  onClick={()=>handleCategory('Shoes_for_Men')}  className='p-2 box-shadow highlightBox' >
        <img src="/Mens-Shoes.jpg" alt="" className='w-[250px] h-[250px]  border-2 border-solid border-slate-200' />
        <h1 className='text-xl font-semibold text-center'>Shoes for Mens</h1>
        </div>
      </Link>
      <Link to={"/category/smartphones"}>
        <div  onClick={()=>handleCategory('smartphones')}  className='p-2 box-shadow highlightBox'>
        <img src="/premium-phones.webp" alt="" className='w-[250px] h-[250px]  border-2 border-solid border-slate-200' />
        <h1 className='text-xl font-semibold text-center'>SmartPhones</h1>
        </div>
    </Link>
    </div>
  )
}

export default Categories
