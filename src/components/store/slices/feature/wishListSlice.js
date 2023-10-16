import {createAsyncThunk, createSlice } from "@reduxjs/toolkit"
const host=import.meta.env.VITE_BASE_URL 


const initialState={
    wishListItems:[],
    ItemsCount:{}
}

const wishListSlice=createSlice({
    name : "wishlist",
    initialState,
    reducers:{
        // addwish(state,action){
        //     let flag=1;
        //     state.wishListItems.forEach(element => {
        //         if (element._id===action.payload._id) {
        //             flag=0;
        //         }
        //     });
        //     if(flag===1){
        //         state.wishListItems.push(action.payload)
        //         state.ItemsCount[action.payload._id]=action.payload._id

        //     }
        // },
        // removeItem(state,action){
        //     state.wishListItems= state.wishListItems.filter((item) => item._id !== action.payload._id);
        //     delete state.ItemsCount[action.payload._id]
        // }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getWishlist.fulfilled,(state,action)=>{
            state.wishListItems=action.payload.wishlistItem
            state.ItemsCount=action.payload.wishlistId
        })
        .addCase(addwish.fulfilled,(state,action)=>{
            state.wishListItems=action.payload.wishlistItem
            state.ItemsCount=action.payload.wishlistId
        })
        .addCase(removeItem.fulfilled,(state,action)=>{
            state.wishListItems=action.payload.wishlistItem
            state.ItemsCount=action.payload.wishlistId
        })
    }
})

export const {}=wishListSlice.actions;
export default wishListSlice.reducer;

export const getWishlist= createAsyncThunk('products/getWishlist',async()=> {
    const result = await fetch(`${host}/userData/getWishlistItems`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        }
      })
    const productData = await result.json();
    
    return productData;
})

export const addwish= createAsyncThunk('products/addwish',async(product)=> {
    const item=product;
    const productId=product._id;
    const result = await fetch(`${host}/userData/addWishListItem`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({productId,item})
      })
    const productData = await result.json();
    
    return productData;
})

export const removeItem= createAsyncThunk('products/removeItem',async(product)=> {
    const productId=product._id;
    const result = await fetch(`${host}/userData/removeWishlistItem`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({productId})
      })
    const productData = await result.json();
    
    return productData;
})
