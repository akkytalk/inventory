import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseUrl";

export const getOrderPage = data => dispatch => {
  dispatch(orderLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "orders?page=" + data.pageno + "&pageSize=" + data.pageSize, {
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
    .then(order => {
      dispatch(fetchOrder(order.Order));
    })
    .catch(error => dispatch(orderFailed(error)));
};

export const getOrder = data => dispatch => {
  dispatch(orderLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "getorder", {
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
    .then(order => {
      dispatch(fetchOrderID(order.Order));
    })
    .catch(error => dispatch(orderFailed(error)));
};

export const postOrder = data => dispatch => {
  dispatch(orderLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "order", {
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
    .then(order => {
      console.log(order);
      dispatch(addOrder(order.Order));
    })
    .catch(error => dispatch(orderFailed(error)));
};

export const removeOrder = data => dispatch => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "order/" + data.id, {
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
    .then(order => {
      dispatch(deleteOrder(data));
    })
    .catch(error => dispatch(orderFailed(error)));
};

export const editOrder = data => dispatch => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "order/" + data.id, {
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
    .then(order => {
      console.log(order);
      dispatch(updateOrder(order.Order));
    })
    .catch(error => dispatch(orderFailed(error)));
};

export const showOrder = data => dispatch => {
  dispatch(orderLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "order/" + data.id + "?page=" + data.pageno, {
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
      dispatch(fetchOrder(res.Order));
    })
    .catch(error => dispatch(orderFailed(error)));
};

export const orderLoading = () => ({
  type: ActionTypes.ORDER_LOADING
});

export const orderFailed = errmess => ({
  type: ActionTypes.ORDER_FAILED,
  payload: errmess
});

export const addOrder = order => ({
  type: ActionTypes.POST_ORDER,
  payload: order
});

export const updateOrder = order => ({
  type: ActionTypes.EDIT_ORDER,
  payload: order
});

export const deleteOrder = order => ({
  type: ActionTypes.DELETE_ORDER,
  payload: order
});

export const fetchOrder = order => ({
  type: ActionTypes.FETCH_ORDER,
  payload: order
});

export const fetchOrderID = orderid => ({
  type: ActionTypes.FETCH_ORDERID,
  payload: orderid
});
