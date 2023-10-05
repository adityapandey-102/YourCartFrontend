import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import products from '../../../../assets/products.json'
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
    console.log("hiittes")
        // const result = await fetch(`${process.env.BASE_URL}productItem/fetchAllProducts`)
        const result = await fetch('http://localhost:5000/api/productItem/fetchAllProducts')
        const productData = await result.json();
        
        return productData;
    })
