import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseUrl";

export const getProductPage = data => dispatch => {
  dispatch(productLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "products?page=" + data.pageno + "&pageSize=" + data.pageSize, {
    method: "get",
    headers: myheader
  })
    .then(response => {
      if (response.ok) {
        return response;
      }
      let error = new Error(
        "Error:" + response.status + "Error Text: " + response.statusText
      );

      error.response = response;
      throw error;
    })
    .then(response => response.json())
    .then(product => {
      dispatch(fetchProduct(product.Product));
    })
    .catch(error => dispatch(productFailed(error)));
};

export const getProduct = data => dispatch => {
  dispatch(productLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "getproduct", {
    method: "get",
    headers: myheader
  })
    .then(response => {
      if (response.ok) {
        return response;
      }
      let error = new Error(
        "Error:" + response.status + "Error Text: " + response.statusText
      );

      error.response = response;
      throw error;
    })
    .then(response => response.json())
    .then(productid => {
      dispatch(fetchProductID(productid.Product));
    })
    .catch(error => dispatch(productFailed(error)));
};

export const getProductOrder = data => dispatch => {
  dispatch(productLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "getproductorder", {
    method: "get",
    headers: myheader
  })
    .then(response => {
      if (response.ok) {
        return response;
      }
      let error = new Error(
        "Error:" + response.status + "Error Text: " + response.statusText
      );

      error.response = response;
      throw error;
    })
    .then(response => response.json())
    .then(productid => {
      dispatch(fetchProductOrder(productid.Product));
    })
    .catch(error => dispatch(productFailed(error)));
};

export const postProduct = data => dispatch => {
  dispatch(productLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "product", {
    method: "post",
    headers: myheader,
    body: JSON.stringify(data)
  })
    .then(response => {
      if (response.ok) {
        return response;
      }
      let error = new Error(
        "Error:" + response.status + "Error Text: " + response.statusText
      );

      error.response = response;
      throw error;
    })
    .then(response => response.json())
    .then(product => {
      console.log(product);
      dispatch(addProduct(product.Product));
    })
    .catch(error => dispatch(productFailed(error)));
};

export const removeProduct = data => dispatch => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "product/" + data.id, {
    method: "delete",
    headers: myheader
  })
    .then(response => {
      if (response.ok) {
        return response;
      }
      let error = new Error(
        "Error:" + response.status + "Error Text: " + response.statusText
      );

      error.response = response;
      throw error;
    })
    .then(response => response.json())
    .then(product => {
      dispatch(deleteProduct(data));
    })
    .catch(error => dispatch(productFailed(error)));
};

export const editProduct = data => dispatch => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "product/" + data.id, {
    method: "post",
    headers: myheader,
    body: JSON.stringify(data)
  })
    .then(response => {
      if (response.ok) {
        return response;
      }
      let error = new Error(
        "Error:" + response.status + "Error Text: " + response.statusText
      );

      error.response = response;
      throw error;
    })
    .then(response => response.json())
    .then(product => {
      dispatch(updateProduct(product.Product));
    })
    .catch(error => dispatch(productFailed(error)));
};

export const showProduct = data => dispatch => {
  dispatch(productLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "product/" + data.id + "?page=" + data.pageno, {
    method: "get",
    headers: myheader
  })
    .then(response => {
      if (response.ok) {
        return response;
      }
      let error = new Error(
        "Error:" + response.status + "Error Text: " + response.statusText
      );

      error.response = response;
      throw error;
    })
    .then(response => response.json())
    .then(res => {
      dispatch(fetchProduct(res.Product));
    })
    .catch(error => dispatch(productFailed(error)));
};

export const productLoading = () => ({
  type: ActionTypes.PRODUCT_LOADING
});

export const productFailed = errmess => ({
  type: ActionTypes.PRODUCT_FAILED,
  payload: errmess
});

export const addProduct = product => ({
  type: ActionTypes.POST_PRODUCT,
  payload: product
});

export const updateProduct = product => ({
  type: ActionTypes.EDIT_PRODUCT,
  payload: product
});

export const deleteProduct = product => ({
  type: ActionTypes.DELETE_PRODUCT,
  payload: product
});

export const fetchProduct = product => ({
  type: ActionTypes.FETCH_PRODUCT,
  payload: product
});

export const fetchProductID = productid => ({
  type: ActionTypes.FETCH_PRODUCTID,
  payload: productid
});

export const fetchProductOrder = productorder => ({
  type: ActionTypes.FETCH_PRODUCTORDER,
  payload: productorder
});
