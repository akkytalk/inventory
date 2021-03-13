import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseUrl";

export const getBillingPage = data => dispatch => {
  dispatch(billingLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(
    baseUrl + "billings?page=" + data.pageno + "&pageSize=" + data.pageSize,
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
    .then(billing => {
      dispatch(fetchBilling(billing.Billing));
    })
    .catch(error => dispatch(billingFailed(error)));
};

export const getBilling = data => dispatch => {
  dispatch(billingLoading(true));
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
    .then(billingorder => {
      console.log(billingorder);
      dispatch(fetchBillingOrder(billingorder.Billing));
    })
    .catch(error => dispatch(billingFailed(error)));
};

export const postBilling = data => dispatch => {
  dispatch(billingLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "billing", {
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
    .then(billing => {
      console.log(billing);
      dispatch(addBilling(billing.Billing));
    })
    .catch(error => dispatch(billingFailed(error)));
};

export const removeBilling = data => dispatch => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "billing/" + data.id, {
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
    .then(billing => {
      dispatch(deleteBilling(data));
    })
    .catch(error => dispatch(billingFailed(error)));
};

export const editBilling = data => dispatch => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "billing/" + data.id, {
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
    .then(billing => {
      console.log(billing);
      dispatch(updateBilling(billing.Billing));
    })
    .catch(error => dispatch(billingFailed(error)));
};

export const generateBilling = data => dispatch => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "generatebill/" + data.id, {
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
    .then(billing => {
      console.log(billing);
      dispatch(updateBilling(billing.Billing));
    })
    .catch(error => dispatch(billingFailed(error)));
};

export const showBilling = data => dispatch => {
  dispatch(billingLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "billing/" + data.id + "?page=" + data.pageno, {
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
    .then(billing => {
      dispatch(fetchBilling(billing.Billing));
    })
    .catch(error => dispatch(billingFailed(error)));
};

export const billingLoading = () => ({
  type: ActionTypes.BILLING_LOADING
});

export const billingFailed = errmess => ({
  type: ActionTypes.BILLING_FAILED,
  payload: errmess
});

export const addBilling = billing => ({
  type: ActionTypes.POST_BILLING,
  payload: billing
});

export const updateBilling = billing => ({
  type: ActionTypes.EDIT_BILLING,
  payload: billing
});

export const deleteBilling = billing => ({
  type: ActionTypes.DELETE_BILLING,
  payload: billing
});

export const fetchBilling = billing => ({
  type: ActionTypes.FETCH_BILLING,
  payload: billing
});

export const fetchBillingOrder = billingorder => ({
  type: ActionTypes.FETCH_BILLINGORDER,
  payload: billingorder
});
