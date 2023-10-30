import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",

  initialState: {
    products: [],
    isFetching: false,
    error: false,
  },

  reducers: {
    //Get Product

    getProductStart: (state) => {
      state.isFetching = true;
    },
    getProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products = action.payload;
    },
    getProductFailture: (state) => {
      state.error = true;
    },

    //Delete Product
    DeleteProductStart: (state) => {
      state.isFetching = true;
    },

    DeleteProductSuccess: (state, action) => {
      state.isFetching = false;

      state.products = state.products.filter(
        (item) => item._id !== action.payload
      );
      //This code creates a new state.products array without the product that matches the action.payload, leaving the original state object untouched. This approach is in line with Redux's principles of immutability and state management.

      // state.products.splice((state.products.findIndex((item) => item._id=== action.payload)),1)
      // },
    },
    DeleteProductFailture: (state) => {
      state.error = true;
    },

    //Update Product
    updateProductStart: (state) => {
      state.isFetching = true;
    },
    updateProductSuccess: (state, action) => {
      state.isFetching = false;
      const updatedProductIndex = state.products.findIndex(
        (item) => item._id === action.payload.id
      );
      if (updatedProductIndex !== -1) {
        state.products[updatedProductIndex] = action.payload.product;
      }
    },

    // [1,2,3,4][2] = 3
    updateProductFailture: (state) => {
      state.error = true;
    },

    //addProduct

    addProductStart: (state) => {
      state.isFetching = true;
    },

    addProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products.push(action.payload);
    },

    addProductFailture: (state) => {
      state.error = true;
    },
    resetProducts: (state) => {
      state.products = [];
    },
  },
});

export const {
  getProductStart,
  getProductSuccess,
  getProductFailture,
  DeleteProductStart,
  DeleteProductSuccess,
  DeleteProductFailture,
  updateProductFailture,
  updateProductSuccess,
  updateProductStart,
  addProductStart,
  addProductFailture,
  addProductSuccess,
  resetProducts,
} = productSlice.actions;

export default productSlice.reducer;
