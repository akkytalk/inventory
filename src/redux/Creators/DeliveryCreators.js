import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseUrl";

export const getDeliveryPage = data => dispatch => {
  dispatch(deliveryLoading(true));
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
    .then(delivery => {
      console.log(delivery);
      dispatch(fetchDelivery(delivery.Shipment));
    })
    .catch(error => dispatch(deliveryFailed(error)));
};

export const getDelivery = data => dispatch => {
  dispatch(deliveryLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "getdelivery", {
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
    .then(delivery => {
      dispatch(fetchDeliveryID(delivery.Delivery));
    })
    .catch(error => dispatch(deliveryFailed(error)));
};

export const postDelivery = data => dispatch => {
  dispatch(deliveryLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "delivery", {
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
    .then(delivery => {
      console.log(delivery);
      dispatch(addDelivery(delivery.Delivery));
    })
    .catch(error => dispatch(deliveryFailed(error)));
};

export const removeDelivery = data => dispatch => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "delivery/" + data.id, {
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
    .then(delivery => {
      dispatch(deleteDelivery(data));
    })
    .catch(error => dispatch(deliveryFailed(error)));
};

export const editDelivery = data => dispatch => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "delivery/" + data.id, {
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
    .then(delivery => {
      dispatch(updateDelivery(delivery.Delivery));
    })
    .catch(error => dispatch(deliveryFailed(error)));
};

export const showDelivery = data => dispatch => {
  dispatch(deliveryLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "delivery/" + data.id + "?page=" + data.pageno, {
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
      dispatch(fetchDelivery(res.Delivery));
    })
    .catch(error => dispatch(deliveryFailed(error)));
};

export const deliveryLoading = () => ({
  type: ActionTypes.DELIVERY_LOADING
});

export const deliveryFailed = errmess => ({
  type: ActionTypes.DELIVERY_FAILED,
  payload: errmess
});

export const addDelivery = delivery => ({
  type: ActionTypes.POST_DELIVERY,
  payload: delivery
});

export const updateDelivery = delivery => ({
  type: ActionTypes.EDIT_DELIVERY,
  payload: delivery
});

export const deleteDelivery = delivery => ({
  type: ActionTypes.DELETE_DELIVERY,
  payload: delivery
});

export const fetchDelivery = delivery => ({
  type: ActionTypes.FETCH_DELIVERY,
  payload: delivery
});

export const fetchDeliveryID = deliveryid => ({
  type: ActionTypes.FETCH_DELIVERYID,
  payload: deliveryid
});
