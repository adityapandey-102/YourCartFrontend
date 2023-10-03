import { createSlice } from "@reduxjs/toolkit"

const initialState={
    wishListItems:[],
    ItemsCount:{}
}

const wishListSlice=createSlice({
    name : "wishlist",
    initialState,
    reducers:{
        addwish(state,action){
            let flag=1;
            state.wishListItems.forEach(element => {
                if (element.id===action.payload.id) {
                    flag=0;
                }
            });
            if(flag===1){
                state.wishListItems.push(action.payload)
                state.ItemsCount[action.payload.id]=action.payload.id

            }
        },
        removeItem(state,action){
            state.wishListItems= state.wishListItems.filter((item) => item.id !== action.payload.id);
            delete state.ItemsCount[action.payload.id]
        }
    }
})

export const {addwish,removeItem}=wishListSlice.actions;
export default wishListSlice.reducer;