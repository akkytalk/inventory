import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseUrl";

export const getStockPage = data => dispatch => {
  dispatch(stockLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "stocks?page=" + data.pageno + "&pageSize=" + data.pageSize, {
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
    .then(stock => {
      dispatch(fetchStock(stock.Stock));
    })
    .catch(error => dispatch(stockFailed(error)));
};

export const getStock = data => dispatch => {
  dispatch(stockLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "getstock", {
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
    .then(stock => {
      dispatch(fetchStockID(stock.Stock));
    })
    .catch(error => dispatch(stockFailed(error)));
};

export const getCount = data => dispatch => {
  dispatch(stockLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "countcard", {
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
    .then(stock => {
      console.log(stock)
      dispatch(fetchCount(stock.Stock));
    })
    .catch(error => dispatch(stockFailed(error)));
};

export const postStock = data => dispatch => {
  dispatch(stockLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "stock", {
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
    .then(stock => {
      console.log(stock);
      dispatch(addStock(stock.Stock));
    })
    .catch(error => dispatch(stockFailed(error)));
};

export const removeStock = data => dispatch => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "stock/" + data.id, {
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
    .then(stock => {
      dispatch(deleteStock(data));
    })
    .catch(error => dispatch(stockFailed(error)));
};

export const editStock = data => dispatch => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "stock/" + data.id, {
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
    .then(stock => {
      dispatch(updateStock(stock.Stock));
    })
    .catch(error => dispatch(stockFailed(error)));
};

export const showStock = data => dispatch => {
  dispatch(stockLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "stock/" + data.id + "?page=" + data.pageno, {
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
      dispatch(fetchStock(res.Stock));
    })
    .catch(error => dispatch(stockFailed(error)));
};

export const stockLoading = () => ({
  type: ActionTypes.STOCK_LOADING
});

export const stockFailed = errmess => ({
  type: ActionTypes.STOCK_FAILED,
  payload: errmess
});

export const addStock = stock => ({
  type: ActionTypes.POST_STOCK,
  payload: stock
});

export const updateStock = stock => ({
  type: ActionTypes.EDIT_STOCK,
  payload: stock
});

export const deleteStock = stock => ({
  type: ActionTypes.DELETE_STOCK,
  payload: stock
});

export const fetchStock = stock => ({
  type: ActionTypes.FETCH_STOCK,
  payload: stock
});

export const fetchCount = count => ({
  type: ActionTypes.FETCH_COUNT,
  payload: count
});

export const fetchStockID = stockid => ({
  type: ActionTypes.FETCH_STOCKID,
  payload: stockid
});
