import { loginFailture, loginStart, loginSuccess } from "./userRedux";


import { publicRequest, userRequest } from "../requestMethods";
import {
  DeleteProductFailture,
  DeleteProductStart,
  DeleteProductSuccess,
  addProductFailture,
  addProductStart,
  addProductSuccess,
  getProductFailture,
  getProductStart,
  getProductSuccess,
  updateProductFailture,
  updateProductStart,
  updateProductSuccess,
} from "./productRedux";




export const login = async (dispatch, user) => {
  dispatch(loginStart());

  try {
    await publicRequest.post("auth/login", user).then((res) => {
      dispatch(loginSuccess(res.data));
      alert(res.data.username + " Logged In");
      localStorage.setItem("token", res.data.accessToken);
    });
  } catch (error) {
    dispatch(loginFailture());
  }
};




export const getProducts = async (dispatch) => {
  dispatch(getProductStart());

  try {
    await publicRequest.get("products").then((res) => {
      dispatch(getProductSuccess(res.data));
    });
  } catch (error) {
    dispatch(getProductFailture());
  }
};

//del
export const deleteProduct = async (id, dispatch) => {
  dispatch(DeleteProductStart());

  try {
    //    const res = await userRequest.delete(`products/${id}`)
    dispatch(DeleteProductSuccess(id));
  } catch (error) {
    dispatch(DeleteProductFailture());
  }
};

//update
export const updateProduct = async (id, product, dispatch) => {

  
  dispatch(updateProductStart());

  try {
    const res = await userRequest.put(`products/${id}`, product);
    const updatedProduct = res.data; // Assuming the response contains the updated product
    await dispatch(updateProductSuccess({id, updatedProduct}));
    console.log(res.data);
    alert(res.data.title.slice(0, 10) + " Uploaded Successfully");
    
  } catch (error) {
    dispatch(updateProductFailture()); // Fixed the typo in the action name
  }
};

//Add Product:
export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());

  try {
    const res = await userRequest.post("products", product);
    alert(res.data.title + "Uploaded Successfully");
    //already sending an object so dont need to use {product} as object
    dispatch(addProductSuccess(res.data));
  } catch (error) {
    dispatch(addProductFailture());
  }
};
