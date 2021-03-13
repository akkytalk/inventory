import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseUrl";

export const getPurchaseReport = data => dispatch => {
  dispatch(reportLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(
    baseUrl +
      "purchase?from_date=" +
      data.from_date +
      "&to_date=" +
      data.to_date,
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
    .then(report => {
      dispatch(fetchPurchaseReport(report.PurchaseReport));
    })
    .catch(error => dispatch(reportFailed(error)));
};

export const reportLoading = () => ({
  type: ActionTypes.REPORT_LOADING
});

export const reportFailed = errmess => ({
  type: ActionTypes.REPORT_FAILED,
  payload: errmess
});

export const addReport = report => ({
  type: ActionTypes.POST_REPORT,
  payload: report
});

export const updateReport = report => ({
  type: ActionTypes.EDIT_REPORT,
  payload: report
});

export const deleteReport = report => ({
  type: ActionTypes.DELETE_REPORT,
  payload: report
});

export const fetchPurchaseReport = purchasereport => ({
  type: ActionTypes.FETCH_PURCHASEREPORT,
  payload: purchasereport
});

export const fetchReportID = reportid => ({
  type: ActionTypes.FETCH_REPORTID,
  payload: reportid
});
