import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseUrl";

export const getShipmentPage = data => dispatch => {
  dispatch(shipmentLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(
    baseUrl + "shipments?page=" + data.pageno + "&pageSize=" + data.pageSize,
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
    .then(shipment => {
      console.log(shipment);
      dispatch(fetchShipment(shipment.Shipment));
    })
    .catch(error => dispatch(shipmentFailed(error)));
};

export const getShipment = data => dispatch => {
  dispatch(shipmentLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "getshipment", {
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
    .then(shipment => {
      dispatch(fetchShipmentID(shipment.Shipment));
    })
    .catch(error => dispatch(shipmentFailed(error)));
};

export const postShipment = data => dispatch => {
  dispatch(shipmentLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "shipment", {
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
    .then(shipment => {
      console.log(shipment);
      dispatch(addShipment(shipment.Shipment));
    })
    .catch(error => dispatch(shipmentFailed(error)));
};

export const removeShipment = data => dispatch => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "shipment/" + data.id, {
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
    .then(shipment => {
      dispatch(deleteShipment(data));
    })
    .catch(error => dispatch(shipmentFailed(error)));
};

export const editShipment = data => dispatch => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "shipment/" + data.id, {
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
    .then(shipment => {
      console.log(shipment);
      dispatch(updateShipment(shipment.Shipment));
    })
    .catch(error => dispatch(shipmentFailed(error)));
};

export const showShipmentProduct = data => dispatch => {
  dispatch(shipmentLoading(true));
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
      dispatch(fetchShipmentProduct(res.ShipmentProduct));
    })
    .catch(error => dispatch(shipmentFailed(error)));
};

export const showShipmentOrder = data => dispatch => {
  dispatch(shipmentLoading(true));
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
      dispatch(fetchShipmentOrder(res.ShipmentOrder));
    })
    .catch(error => dispatch(shipmentFailed(error)));
};

export const shipmentLoading = () => ({
  type: ActionTypes.SHIPMENT_LOADING
});

export const shipmentFailed = errmess => ({
  type: ActionTypes.SHIPMENT_FAILED,
  payload: errmess
});

export const addShipment = shipment => ({
  type: ActionTypes.POST_SHIPMENT,
  payload: shipment
});

export const updateShipment = shipment => ({
  type: ActionTypes.EDIT_SHIPMENT,
  payload: shipment
});

export const deleteShipment = shipment => ({
  type: ActionTypes.DELETE_SHIPMENT,
  payload: shipment
});

export const fetchShipment = shipment => ({
  type: ActionTypes.FETCH_SHIPMENT,
  payload: shipment
});

export const fetchShipmentOrder = shipmentorder => ({
  type: ActionTypes.FETCH_SHIPMENTORDER,
  payload: shipmentorder
});

export const fetchShipmentProduct = shipmentproduct => ({
  type: ActionTypes.FETCH_SHIPMENTPRODUCT,
  payload: shipmentproduct
});

export const fetchShipmentID = shipmentid => ({
  type: ActionTypes.FETCH_SHIPMENTID,
  payload: shipmentid
});
