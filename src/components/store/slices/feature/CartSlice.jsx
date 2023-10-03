import { createSlice } from "@reduxjs/toolkit";
const initialState={
    cartItems:[],
    ItemsCount:{}
}
const CartSlice=createSlice({
    name:"cart",
    initialState,
    reducers:{
        add(state,action){
            let flag=1;
            state.cartItems.forEach(element => {
                if (element.id===action.payload.id) {
                    flag=0;
                }
            });
            if(flag===1){
                state.cartItems.push(action.payload)
                state.ItemsCount[action.payload.id]=1
                
            }
            // flag=1;
            
        },
        removeCartItem(state,action){
            state.cartItems= state.cartItems.filter((item) => item.id !== action.payload.id);
            delete state.ItemsCount[action.payload.id]
        },
        increaseItemCount(state,action){
            if (true) {
                state.ItemsCount[action.payload.id]+=1
            }
        },
        decreaseItemCount(state,action){
            if (state.ItemsCount[action.payload.id]>1) { 
                state.ItemsCount[action.payload.id]-=1
            }
        }
    }

});

export const  {add,removeCartItem,increaseItemCount,decreaseItemCount}=CartSlice.actions
export default CartSlice.reducer;