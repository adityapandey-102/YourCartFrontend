import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    InitialContainer: [],
    filterProduct: [],
    CategoryFilterContainer: [],
    categories: {
        Shoes_for_Men: false,
        smartphones: false,
        electronics: false,
        mens_clothing: false,
        books: false,
    },
    priceRange: 50000,
    rating: 1,
    sortingTechnique: "",

}


const FilterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        addFilterProducts: (state, action) => {
            //Initaially assiging all the data
            state.InitialContainer = action.payload; // container of all items
            state.filterProduct = action.payload; // it hold the final filter products
            state.CategoryFilterContainer = action.payload; // It hold the container for category wise filtered data..

        },
        sethandleCategory: (state, action) => {
            state.categories = action.payload
            state.filterProduct = []
            let trueContains = false;
            Object.keys(state.categories).forEach((category) => {
                if (state.categories[category]) {
                    state.InitialContainer.forEach((item) => {
                        if (item.category === category) {
                            state.filterProduct.push(item)
                        }
                    })
                    trueContains = true;

                }
            })
            if (!trueContains) {
                state.filterProduct = state.InitialContainer
            }
            state.CategoryFilterContainer = state.filterProduct;
        },
        setPriceRange: (state, action) => {
            state.priceRange = action.payload
            if (state.CategoryFilterContainer.length!==0) {
                state.filterProduct = state.CategoryFilterContainer.filter((item) => {
                    return action.payload >= item.price;
                })  
            }
            else{
                state.filterProduct = state.InitialContainer.filter((item) => {
                    return action.payload >= item.price;
                })
            }
        },
        sethandleRating: (state, action) => {
            state.rating = action.payload
            state.filterProduct = state.CategoryFilterContainer.filter((item) => {
                return action.payload <= item.rating.rate
            })
        },
        setSorting: (state, action) => {
            const sortingFuntion = {
                PriceLowToHigh: () => {
                    state.filterProduct = state.filterProduct.sort((a, b) => a.price - b.price);
                },
                PriceHighToLow: () => {
                    state.filterProduct = state.filterProduct.sort((a, b) => b.price - a.price);
                },
                RatingLowToHigh: () => {
                    state.filterProduct = state.filterProduct.sort((a, b) => a.rating.rate - b.rating.rate);
                },
                RatingHighToLow: () => {
                    state.filterProduct = state.filterProduct.sort((a, b) => b.rating.rate - a.rating.rate);
                },
                "": () => {
                    return
                }
            }
            state.sortingTechnique = action.payload
            const sortFilter = sortingFuntion[action.payload]
            sortFilter();
        },
        handleClear: (state, action) => {
            state.filterProduct = state.InitialContainer
            state.CategoryFilterContainer = []
            state.categories = {
                Shoes_for_Men: false,
                smartphones: false,
                electronics: false,
                mens_clothing: false,
                books: false,
            }
            state.priceRange = 50000
            state.rating = 1,
            state.sortingTechnique = ""

        }
    }

}
)

export const { addFilterProducts, sethandleCategory, setPriceRange, sethandleRating, setSorting, handleClear } = FilterSlice.actions
export default FilterSlice.reducer
export const filterReducer = FilterSlice.reducer


