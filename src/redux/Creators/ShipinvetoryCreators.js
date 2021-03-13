import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseUrl";

export const getShipinventoryPage = data => dispatch => {
  dispatch(shipinventoryLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(
    baseUrl + "categories?page=" + data.pageno + "&pageSize=" + data.pageSize,
    {
      method: "get",
      headers: myheader
    }
  )
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
    .then(shipinventory => {
      dispatch(fetchShipinventory(shipinventory.Shipinventory));
    })
    .catch(error => dispatch(shipinventoryFailed(error)));
};

export const getShipinventory = data => dispatch => {
  dispatch(shipinventoryLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "getshipinventory", {
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
    .then(shipinventory => {
      dispatch(fetchShipinventoryID(shipinventory.Shipinventory));
    })
    .catch(error => dispatch(shipinventoryFailed(error)));
};

export const postShipinventory = data => dispatch => {
  dispatch(shipinventoryLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "shipmentinventory", {
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
    .then(shipinventory => {
      console.log(shipinventory);
      dispatch(addShipinventory(shipinventory.ShipmentInventory));
    })
    .catch(error => dispatch(shipinventoryFailed(error)));
};

export const removeShipinventory = data => dispatch => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "shipinventory/" + data.id, {
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
    .then(shipinventory => {
      dispatch(deleteShipinventory(data));
    })
    .catch(error => dispatch(shipinventoryFailed(error)));
};

export const editShipinventory = data => dispatch => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "shipinventory/" + data.id, {
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
    .then(shipinventory => {
      dispatch(updateShipinventory(shipinventory.Shipinventory));
    })
    .catch(error => dispatch(shipinventoryFailed(error)));
};

export const showShipinventoryOrder = data => dispatch => {
  dispatch(shipinventoryLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "shipmentorder/" + data.id + "?page=" + data.pageno, {
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
      console.log(res);
      dispatch(fetchShipinventoryOrder(res.ShipmentOrder));
    })
    .catch(error => dispatch(shipinventoryFailed(error)));
};

export const showShipinventoryProduct = data => dispatch => {
  dispatch(shipinventoryLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(
    baseUrl + "shipmentproduct/" + data.id + "?page=" + data.pageno,
    {
      method: "get",
      headers: myheader
    }
  )
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
      dispatch(fetchShipinventoryProduct(res.ShipmentProduct));
    })
    .catch(error => dispatch(shipinventoryFailed(error)));
};

export const shipinventoryLoading = () => ({
  type: ActionTypes.SHIPINVENTORY_LOADING
});

export const shipinventoryFailed = errmess => ({
  type: ActionTypes.SHIPINVENTORY_FAILED,
  payload: errmess
});

export const addShipinventory = shipinventory => ({
  type: ActionTypes.POST_SHIPINVENTORY,
  payload: shipinventory
});

export const updateShipinventory = shipinventory => ({
  type: ActionTypes.EDIT_SHIPINVENTORY,
  payload: shipinventory
});

export const deleteShipinventory = shipinventory => ({
  type: ActionTypes.DELETE_SHIPINVENTORY,
  payload: shipinventory
});

export const fetchShipinventory = shipinventory => ({
  type: ActionTypes.FETCH_SHIPINVENTORY,
  payload: shipinventory
});

export const fetchShipinventoryOrder = shipinventoryorder => ({
  type: ActionTypes.FETCH_SHIPINVENTORYORDER,
  payload: shipinventoryorder
});

export const fetchShipinventoryProduct = shipinventoryproduct => ({
  type: ActionTypes.FETCH_SHIPINVENTORYPRODUCT,
  payload: shipinventoryproduct
});

export const fetchShipinventoryID = shipinventoryid => ({
  type: ActionTypes.FETCH_SHIPINVENTORYID,
  payload: shipinventoryid
});
