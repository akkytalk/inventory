import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseUrl";

export const getCategoryPage = data => dispatch => {
  dispatch(categoryLoading(true));
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
    .then(category => {
      dispatch(fetchCategory(category.Category));
    })
    .catch(error => dispatch(categoryFailed(error)));
};

export const getCategory = data => dispatch => {
  dispatch(categoryLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "getcategory", {
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
    .then(category => {
      dispatch(fetchCategoryID(category.Category));
    })
    .catch(error => dispatch(categoryFailed(error)));
};

export const postCategory = data => dispatch => {
  dispatch(categoryLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "category", {
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
    .then(category => {
      console.log(category);
      dispatch(addCategory(category.Category));
    })
    .catch(error => dispatch(categoryFailed(error)));
};

export const removeCategory = data => dispatch => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "category/" + data.id, {
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
    .then(category => {
      dispatch(deleteCategory(data));
    })
    .catch(error => dispatch(categoryFailed(error)));
};

export const editCategory = data => dispatch => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "category/" + data.id, {
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
    .then(category => {
      dispatch(updateCategory(category.Category));
    })
    .catch(error => dispatch(categoryFailed(error)));
};

export const showCategory = data => dispatch => {
  dispatch(categoryLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "category/" + data.id + "?page=" + data.pageno, {
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
      dispatch(fetchCategory(res.Category));
    })
    .catch(error => dispatch(categoryFailed(error)));
};

export const categoryLoading = () => ({
  type: ActionTypes.CATEGORY_LOADING
});

export const categoryFailed = errmess => ({
  type: ActionTypes.CATEGORY_FAILED,
  payload: errmess
});

export const addCategory = category => ({
  type: ActionTypes.POST_CATEGORY,
  payload: category
});

export const updateCategory = category => ({
  type: ActionTypes.EDIT_CATEGORY,
  payload: category
});

export const deleteCategory = category => ({
  type: ActionTypes.DELETE_CATEGORY,
  payload: category
});

export const fetchCategory = category => ({
  type: ActionTypes.FETCH_CATEGORY,
  payload: category
});

export const fetchCategoryID = categoryid => ({
  type: ActionTypes.FETCH_CATEGORYID,
  payload: categoryid
});
