import axios from "axios";
import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  CLEAR_ERRORS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from "../constants/productConstant";

export const getAllProducts =
  (keyword = "", currentPage = 1) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCT_REQUEST });
      let link = `http://localhost:5000/api/v1/products?keyword=${keyword}&page=${currentPage}`;
      // if (category) {
      //   link = `http://localhost:5000/api/v1/products?keyword=${keyword}&page=${currentPage}&category=${category}`;
      // }

      axios
        .get(link)
        .then((response) => {
          const data = response.data;
          dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data,
          });
        })
        .catch((error) => {
          console.error(error);
          dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error?.response?.data?.message,
          });
        });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    axios
      .get(`http://localhost:5000/api/v1/products/${id}`)
      .then((response) => {
        const data = response.data;
        dispatch({
          type: PRODUCT_DETAILS_SUCCESS,
          payload: data.product,
        });
      })
      .catch((error) => {
        console.error(error);
        dispatch({
          type: PRODUCT_DETAILS_FAIL,
          payload: error?.response?.data?.message,
        });
      });
  } catch (error) {
    dispatch({
      type: ALL_PRODUCT_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};

export const clearAllError = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
