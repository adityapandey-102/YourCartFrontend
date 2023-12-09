import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
const host=import.meta.env.VITE_BASE_URL 

const initialState={
    cartItems:[],
    ItemsCount:{}
}
const CartSlice=createSlice({
    name:"cart",
    initialState,
    reducers:{
        // addCartItem(state,action){
        //     let flag=1;
        //     state.cartItems.forEach(element => {
        //         if (element._id===action.payload._id) {
        //             flag=0;
        //         }
        //     });
        //     if(flag===1){
        //         state.cartItems.push(action.payload)
        //         state.ItemsCount[action.payload._id]=1
                
        //     }
        //     // flag=1;
            
        // },
        // removeCartItem(state,action){
        //     state.cartItems= state.cartItems.filter((item) => item._id !== action.payload._id);
        //     delete state.ItemsCount[action.payload._id]
        // },
        increaseItemCount(state,action){
            if (true) {
                state.ItemsCount[action.payload._id]+=1
            }
        },
        decreaseItemCount(state,action){
            if (state.ItemsCount[action.payload._id]>1) { 
                state.ItemsCount[action.payload._id]-=1
            }
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getCartItems.fulfilled,(state,action)=>{
            state.cartItems=action.payload.cartItem
            state.ItemsCount=action.payload.cartItemCount
        })
        .addCase(addCartItem.fulfilled,(state,action)=>{
            state.cartItems=action.payload.cartItem
            state.ItemsCount=action.payload.cartItemCount
        })
        .addCase(removeCartItem.fulfilled,(state,action)=>{
            state.cartItems=action.payload.cartItem
            state.ItemsCount=action.payload.cartItemCount
        })
        .addCase(increaseItemCount.fulfilled,(state,action)=>{
                state.ItemsCount[action.payload]+=1
        })
        .addCase(decreaseItemCount.fulfilled,(state,action)=>{
                state.ItemsCount[action.payload]-=1
        })
        .addCase(removeAllItemsFromCart.fulfilled,(state,action)=>{
          state.cartItems=[]
          state.ItemsCount={}
        })
    }

});

export const  {}=CartSlice.actions
export default CartSlice.reducer;

export const getCartItems= createAsyncThunk('products/getCartItems',async()=> {
    const result = await fetch(`${host}/userData/getCartItems`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        }
      })
    const productData = await result.json();
    
    return productData;
})

export const addCartItem= createAsyncThunk('products/addCartItem',async(product)=> {
    const item=product;
    const productId=product._id;
    const result = await fetch(`${host}/userData/addCartItem`,{
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

export const removeCartItem= createAsyncThunk('products/removeCartItem',async(product)=> {
    const productId=product._id;
    const result = await fetch(`${host}/userData/removeCartItem`,{
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
export const increaseItemCount= createAsyncThunk('products/increaseItemCount',async(product)=> {
    const productId=product._id;
    const result = await fetch(`${host}/userData/increaseItemCount`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({productId})
      })
    const productData = await result.json();
    
    return productId;
})
export const decreaseItemCount= createAsyncThunk('products/decreaseItemCount',async(product)=> {
    const productId=product._id;
    const result = await fetch(`${host}/userData/decreaseItemCount`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({productId})
      })
    const productData = await result.json();
    
    return productId;
})
export const removeAllItemsFromCart= createAsyncThunk('products/removeAllItemsFromCart',async(products)=> {
 
    const result = await fetch(`${host}/userData/removeAllFromCart`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    })
  // const productData = await result.json();
    
    return
})
