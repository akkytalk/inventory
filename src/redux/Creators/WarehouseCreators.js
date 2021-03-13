import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseUrl";

export const getWarehousePage = data => dispatch => {
  dispatch(warehouseLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "warehouses?page=" + data.pageno + "&pageSize=" + data.pageSize, {
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
    .then(warehouse => {
      dispatch(fetchWarehouse(warehouse.Warehouse));
    })
    .catch(error => dispatch(warehouseFailed(error)));
};

export const getWarehouse = data => dispatch => {
  dispatch(warehouseLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "getwarehouse", {
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
    .then(warehouse => {
      dispatch(fetchWarehouseID(warehouse.Warehouse));
    })
    .catch(error => dispatch(warehouseFailed(error)));
};

export const postWarehouse = data => dispatch => {
  dispatch(warehouseLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "warehouse", {
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
    .then(warehouse => {
      console.log(warehouse);
      dispatch(addWarehouse(warehouse.Warehouse));
    })
    .catch(error => dispatch(warehouseFailed(error)));
};

export const removeWarehouse = data => dispatch => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "warehouse/" + data.id, {
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
    .then(warehouse => {
      dispatch(deleteWarehouse(data));
    })
    .catch(error => dispatch(warehouseFailed(error)));
};

export const editWarehouse = data => dispatch => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "warehouse/" + data.id, {
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
    .then(warehouse => {
      dispatch(updateWarehouse(warehouse.Warehouse));
    })
    .catch(error => dispatch(warehouseFailed(error)));
};

export const showWarehouse = data => dispatch => {
  dispatch(warehouseLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "warehouse/" + data.id + "?page=" + data.pageno, {
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
      dispatch(fetchWarehouse(res.Warehouse));
    })
    .catch(error => dispatch(warehouseFailed(error)));
};

export const warehouseLoading = () => ({
  type: ActionTypes.WAREHOUSE_LOADING
});

export const warehouseFailed = errmess => ({
  type: ActionTypes.WAREHOUSE_FAILED,
  payload: errmess
});

export const addWarehouse = warehouse => ({
  type: ActionTypes.POST_WAREHOUSE,
  payload: warehouse
});

export const updateWarehouse = warehouse => ({
  type: ActionTypes.EDIT_WAREHOUSE,
  payload: warehouse
});

export const deleteWarehouse = warehouse => ({
  type: ActionTypes.DELETE_WAREHOUSE,
  payload: warehouse
});

export const fetchWarehouse = warehouse => ({
  type: ActionTypes.FETCH_WAREHOUSE,
  payload: warehouse
});

export const fetchWarehouseID = warehouseid => ({
  type: ActionTypes.FETCH_WAREHOUSEID,
  payload: warehouseid
});
