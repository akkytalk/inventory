import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseUrl";

export const getReversiblePage = data => dispatch => {
  dispatch(reversibleLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "reversibles?page=" + data.pageno + "&pageSize=" + data.pageSize, {
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
    .then(reversible => {
      dispatch(fetchReversible(reversible.Reversible));
    })
    .catch(error => dispatch(reversibleFailed(error)));
};

export const getReversible = data => dispatch => {
  dispatch(reversibleLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "getreversible", {
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
    .then(reversible => {
      dispatch(fetchReversibleID(reversible.Reversible));
    })
    .catch(error => dispatch(reversibleFailed(error)));
};

export const postReversible = data => dispatch => {
  dispatch(reversibleLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "reversible", {
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
    .then(reversible => {
      console.log(reversible);
      dispatch(addReversible(reversible.Reversible));
    })
    .catch(error => dispatch(reversibleFailed(error)));
};

export const removeReversible = data => dispatch => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "reversible/" + data.id, {
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
    .then(reversible => {
      dispatch(deleteReversible(data));
    })
    .catch(error => dispatch(reversibleFailed(error)));
};

export const editReversible = data => dispatch => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "reversible/" + data.id, {
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
    .then(reversible => {
      dispatch(updateReversible(reversible.Reversible));
    })
    .catch(error => dispatch(reversibleFailed(error)));
};

export const showReversible = data => dispatch => {
  dispatch(reversibleLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "reversible/" + data.id + "?page=" + data.pageno, {
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
      dispatch(fetchReversible(res.Reversible));
    })
    .catch(error => dispatch(reversibleFailed(error)));
};

export const reversibleLoading = () => ({
  type: ActionTypes.REVERSIBLE_LOADING
});

export const reversibleFailed = errmess => ({
  type: ActionTypes.REVERSIBLE_FAILED,
  payload: errmess
});

export const addReversible = reversible => ({
  type: ActionTypes.POST_REVERSIBLE,
  payload: reversible
});

export const updateReversible = reversible => ({
  type: ActionTypes.EDIT_REVERSIBLE,
  payload: reversible
});

export const deleteReversible = reversible => ({
  type: ActionTypes.DELETE_REVERSIBLE,
  payload: reversible
});

export const fetchReversible = reversible => ({
  type: ActionTypes.FETCH_REVERSIBLE,
  payload: reversible
});

export const fetchReversibleID = reversibleid => ({
  type: ActionTypes.FETCH_REVERSIBLEID,
  payload: reversibleid
});
