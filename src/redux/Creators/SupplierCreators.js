import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseUrl";

export const getSupplierPage = data => dispatch => {
  dispatch(supplierLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "suppliers?page=" + data.pageno + "&pageSize=" + data.pageSize, {
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
    .then(supplier => {
      dispatch(fetchSupplier(supplier.Supplier));
    })
    .catch(error => dispatch(supplierFailed(error)));
};

export const getSupplier = data => dispatch => {
  dispatch(supplierLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "getsupplier", {
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
    .then(supplierid => {
      dispatch(fetchSupplierID(supplierid.Supplier));
    })
    .catch(error => dispatch(supplierFailed(error)));
};

export const postSupplier = data => dispatch => {
  dispatch(supplierLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "supplier", {
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
    .then(supplier => {
      console.log(supplier);
      dispatch(addSupplier(supplier.Supplier));
    })
    .catch(error => dispatch(supplierFailed(error)));
};

export const removeSupplier = data => dispatch => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "supplier/" + data.id, {
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
    .then(supplier => {
      dispatch(deleteSupplier(data));
    })
    .catch(error => dispatch(supplierFailed(error)));
};

export const editSupplier = data => dispatch => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "supplier/" + data.id, {
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
    .then(supplier => {
      dispatch(updateSupplier(supplier.Supplier));
    })
    .catch(error => dispatch(supplierFailed(error)));
};

export const showSupplier = data => dispatch => {
  dispatch(supplierLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "supplier/" + data.id + "?page=" + data.pageno, {
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
      dispatch(fetchSupplier(res.Supplier));
    })
    .catch(error => dispatch(supplierFailed(error)));
};

export const supplierLoading = () => ({
  type: ActionTypes.SUPPLIER_LOADING
});

export const supplierFailed = errmess => ({
  type: ActionTypes.SUPPLIER_FAILED,
  payload: errmess
});

export const addSupplier = supplier => ({
  type: ActionTypes.POST_SUPPLIER,
  payload: supplier
});

export const updateSupplier = supplier => ({
  type: ActionTypes.EDIT_SUPPLIER,
  payload: supplier
});

export const deleteSupplier = supplier => ({
  type: ActionTypes.DELETE_SUPPLIER,
  payload: supplier
});

export const fetchSupplier = supplier => ({
  type: ActionTypes.FETCH_SUPPLIER,
  payload: supplier
});

export const fetchSupplierID = supplierid => ({
  type: ActionTypes.FETCH_SUPPLIERID,
  payload: supplierid
});
