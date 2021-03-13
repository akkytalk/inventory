import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseUrl";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const myheader = new Headers({
  Accept: "application/json",
  "Content-Type": "application/json"
});

//LOGIN
export const postLogin = data => dispatch => {
  dispatch(loginLoading(true));
  
  return fetch(baseUrl + "login", {
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
    .then(login => {
      dispatch(addLogin(login));
      toast.success("Welcome");
    })
    .catch(error => dispatch(loginFailed(error)));
};

export const loginLoading = () => ({
  type: ActionTypes.LOGIN_LOADING
});

export const loginFailed = errmess => ({
  type: ActionTypes.LOGIN_FAILED,
  payload: errmess
});

export const addLogin = login => ({
  type: ActionTypes.ADD_LOGIN,
  payload: login
});

export const removeLogin = () => ({
  type: ActionTypes.REMOVE_LOGIN,
  payload: []
});