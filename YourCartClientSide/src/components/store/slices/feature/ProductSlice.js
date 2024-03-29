import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import products from '../../../../assets/products.json'
const host=import.meta.env.VITE_BASE_URL 

const initialState = {
    productData: [],
    inventoryDetail: [],
    productsDetail:{
        "id": "",
    "title": "",
    "price": "",
    "description": "",
    "category": "",
    "image": "",
    "rating": {
      "rate": "",
      "count": ""
    },
    "discount_percentage": ""
    }
}
const ProductSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProductDetail:(state,action)=>{
            state.productsDetail=action.payload
        }

    },
    extraReducers:(builder)=>{
        builder
        .addCase(getProducts.fulfilled,(state,action)=>{
            state.productData=action.payload
        })
    }
});

export const {addProductDetail} = ProductSlice.actions
export default ProductSlice.reducer;


export const getProducts= createAsyncThunk('products/get',async()=> {
        const result = await fetch(`${host}/productItem/fetchAllProducts`)
        const productData = await result.json();
    
        return productData;
    })
