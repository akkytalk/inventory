import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseUrl";

export const getClientPage = data => dispatch => {
  dispatch(clientLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "clients?page=" + data.pageno + "&pageSize=" + data.pageSize, {
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
    .then(client => {
      dispatch(fetchClient(client.Client));
    })
    .catch(error => dispatch(clientFailed(error)));
};

export const getClient = data => dispatch => {
  dispatch(clientLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "getclient", {
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
    .then(client => {
      dispatch(fetchClientID(client.Client));
    })
    .catch(error => dispatch(clientFailed(error)));
};

export const postClient = data => dispatch => {
  dispatch(clientLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "client", {
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
    .then(client => {
      console.log(client);
      dispatch(addClient(client.Client));
    })
    .catch(error => dispatch(clientFailed(error)));
};

export const removeClient = data => dispatch => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "client/" + data.id, {
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
    .then(client => {
      dispatch(deleteClient(data));
    })
    .catch(error => dispatch(clientFailed(error)));
};

export const editClient = data => dispatch => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "client/" + data.id, {
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
    .then(client => {
      dispatch(updateClient(client.Client));
    })
    .catch(error => dispatch(clientFailed(error)));
};

export const showClient = data => dispatch => {
  dispatch(clientLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "client/" + data.id + "?page=" + data.pageno, {
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
      dispatch(fetchClient(res.Client));
    })
    .catch(error => dispatch(clientFailed(error)));
};

export const clientLoading = () => ({
  type: ActionTypes.CLIENT_LOADING
});

export const clientFailed = errmess => ({
  type: ActionTypes.CLIENT_FAILED,
  payload: errmess
});

export const addClient = client => ({
  type: ActionTypes.POST_CLIENT,
  payload: client
});

export const updateClient = client => ({
  type: ActionTypes.EDIT_CLIENT,
  payload: client
});

export const deleteClient = client => ({
  type: ActionTypes.DELETE_CLIENT,
  payload: client
});

export const fetchClient = client => ({
  type: ActionTypes.FETCH_CLIENT,
  payload: client
});

export const fetchClientID = clientid => ({
  type: ActionTypes.FETCH_CLIENTID,
  payload: clientid
});
