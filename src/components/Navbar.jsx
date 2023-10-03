import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import { addProductDetail } from './store/slices/feature/ProductSlice';


function Navbar(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleFilter = () => {
        if (props.open) {
            props.setOpen(false)
        }
        else {
            props.setOpen(true)

        }
    }
    const cartProducts = useSelector(state => state.cart.cartItems);
    const ProductCount = cartProducts.length;
    const wislistItems = useSelector(state => state.wishlist.wishListItems)
    const products = useSelector(state => state.filter.filterProduct)

    const [query, setQuery] = useState("");
    const [searchActive, setSearchActive] = useState("");
    const [searchStyle, setStyle] = useState({
        "display": "none"
    });

    const handleSearch = (data) => {
        // console.log("hitted")

        return data.filter((item) =>
            item.category.toLowerCase().includes(query) ||
            item.title.toLowerCase().includes(query)
        )
    }
    const handleNavigateSearch = (product) => {
        setStyle({
            "display":"none"
        })
        dispatch(addProductDetail(product))
        setQuery("")
        navigate("/productdetails")
    }
    const list = handleSearch(products)


    return (
        <>
            <nav className='bg-violet-700 p-4 flex flex-row flex-wrap gap-x-2 gap-y-4 md:fixed top-0 w-full z-10 shadow-xl md:justify-between'>
                <div className='left-side'>
                    <Link to={"/"} className='font-extrabold text-xl text-white'><img className='inline-block invert w-[25px] h-[25px]' src="https://img.icons8.com/pastel-glyph/64/shopping-cart--v2.png" alt="shopping-cart--v2" /> YourCart</Link>
                </div>
                <div className='midddle-side hidden md:inline-block w-[100vw] md:w-1/4 overflow-hidden ' >
                    <form className="flex bg-white h-8 items-center " role="search">
                        <input className="ms-2 w-[90%]" type="search" placeholder="Search" onChange={(e) => {
                            setQuery(e.target.value)
                            setStyle({
                                "display": "inline-block"
                            })
                        }} name='search' />
                        <button className="p-3" type="submit"><img width="25" height="25" src="https://img.icons8.com/pastel-glyph/64/search--v2.png" alt="search--v2" /></button>
                    </form>
                    {list.length!==0 && query !== "" && <div className='bg-white mt-2 rounded-md absolute z-30 w-[450px] max-h-[300px] overflow-y-scroll p-2' style={searchStyle}>
                        <ul onMouseLeave={()=>{
                    setStyle({
                        "display":"none"
                    })}}>
                            { list.map((item) => {
                                return <li className='border-b-2 border-black border-solid hover:bg-blue-300 py-2' onClick={() => handleNavigateSearch(item)} key={item.id}><p>{item.title.slice(0, 40)}...</p></li>
                            })}
                        </ul>
                    </div>}
                </div>
                <div className='right-side w-auto' >
                    <Link to={"/signup"} type='button' className="px-2 md:px-6 h-8 mx-3 hover:bg-slate-50 bg-white text-violet-950 text-[15px] md:text-base">
                        LogOut
                    </Link>
                    <Link to={"/wishlist"} className="cart relative mx-3">
                        <div className="relative inline-block">
                            <img width="25" height="25" className='inline-block invert' src="https://img.icons8.com/ios/50/like--v1.png" alt="fav-cart--v2" />
                            <span className='absolute bg-red-500 text-white text-[13px] py-[1px] px-2 rounded-full right-[-15px] top-[-10px]'>{wislistItems.length}</span>
                        </div>
                        <span className="text-white hidden md:inline text-xl ml-5">Wishlist</span>
                    </Link>
                    <Link to={"/cart"} className="cart ml-5 md:mr-8">
                        <div className="relative inline-block">
                            <img width="25" height="25" className='inline-block invert' src="https://img.icons8.com/pastel-glyph/64/shopping-cart--v2.png" alt="shopping-cart--v2" />
                            <span className='absolute bg-red-500 text-white px-2 text-[13px] py-[1px] rounded-full right-[-15px] top-[-10px]'>{ProductCount}</span>
                        </div>
                        <span className='text-white hidden md:inline text-xl ml-5'>Cart</span>
                    </Link>
                </div>
            </nav>
            <div className='Seach-Box-mob static md:hidden w-[100vw] sticky z-10 top-0 bg-violet-700 p-3 flex flex-row'>
                <div className='w-[90%]'>
                    <form className="flex rounded-md bg-white h-8 items-center " role="search">
                        <input className="ms-2 w-[90%]" type="search" placeholder="Search" onChange={(e) => setQuery(e.target.value)} />
                        <button className="p-3" type="submit"><img width="25" height="25" src="https://img.icons8.com/pastel-glyph/64/search--v2.png" alt="search--v2" /></button>
                    </form>
                    {list.length!==0 && query !== "" && <div className='bg-white mt-2 rounded-md absolute z-30 w-[450px] max-h-[300px] overflow-y-scroll p-2' style={searchStyle}>
                        <ul onMouseLeave={()=>{
                    setStyle({
                        "display":"none"
                    })}}>
                            { list.map((item) => {
                                return <li className='border-b-2 border-black border-solid hover:bg-blue-300 py-2' onClick={() => handleNavigateSearch(item)} key={item.id}><p>{item.title.slice(0, 40)}...</p></li>
                            })}
                        </ul>
                    </div>}
                </div>
                <div className='inline-block md:hidden ml-3'><MenuIcon onClick={handleFilter} className=' text-white w-[40px]' /> </div>

            </div>
        </>
    )
}

export default Navbar
