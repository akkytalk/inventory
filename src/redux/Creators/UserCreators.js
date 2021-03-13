import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseUrl";

export const getUserPage = data => dispatch => {
  dispatch(userLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "categories?page=" + data.pageno + "&pageSize=" + data.pageSize, {
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
    .then(user => {
      dispatch(fetchUser(user.User));
    })
    .catch(error => dispatch(userFailed(error)));
};

export const getUser = data => dispatch => {
  dispatch(userLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "getuser", {
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
    .then(user => {
      dispatch(fetchUserID(user.User));
    })
    .catch(error => dispatch(userFailed(error)));
};

export const getDeliveryUser = data => dispatch => {
  dispatch(userLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "deliveryuser", {
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
    .then(deliveryuser => {
      dispatch(fetchDeliveryUser(deliveryuser.Delivery));
    })
    .catch(error => dispatch(userFailed(error)));
};

export const postUser = data => dispatch => {
  dispatch(userLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "user", {
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
    .then(user => {
      console.log(user);
      dispatch(addUser(user.User));
    })
    .catch(error => dispatch(userFailed(error)));
};

export const removeUser = data => dispatch => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "user/" + data.id, {
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
    .then(user => {
      dispatch(deleteUser(data));
    })
    .catch(error => dispatch(userFailed(error)));
};

export const editUser = data => dispatch => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "user/" + data.id, {
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
    .then(user => {
      dispatch(updateUser(user.User));
    })
    .catch(error => dispatch(userFailed(error)));
};

export const showUser = data => dispatch => {
  dispatch(userLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "user/" + data.id + "?page=" + data.pageno, {
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
      dispatch(fetchUser(res.User));
    })
    .catch(error => dispatch(userFailed(error)));
};

export const userLoading = () => ({
  type: ActionTypes.USER_LOADING
});

export const userFailed = errmess => ({
  type: ActionTypes.USER_FAILED,
  payload: errmess
});

export const addUser = user => ({
  type: ActionTypes.POST_USER,
  payload: user
});

export const updateUser = user => ({
  type: ActionTypes.EDIT_USER,
  payload: user
});

export const deleteUser = user => ({
  type: ActionTypes.DELETE_USER,
  payload: user
});

export const fetchUser = user => ({
  type: ActionTypes.FETCH_USER,
  payload: user
});

export const fetchDeliveryUser = deliveryuser => ({
  type: ActionTypes.FETCH_DELIVERYUSER,
  payload: deliveryuser
});

export const fetchUserID = userid => ({
  type: ActionTypes.FETCH_USERID,
  payload: userid
});
