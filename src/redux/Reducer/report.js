import * as ActionTypes from "../Types/ActionTypes";

export const Report = (
  state = { isLoading: true, errMess: null, report: [], reportid: [], purchasereport: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_REPORT:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        report: action.payload
      };

    case ActionTypes.FETCH_PURCHASEREPORT:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        purchasereport: action.payload
      };

    case ActionTypes.FETCH_REPORTID:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        reportid: action.payload
      };

    case ActionTypes.REPORT_LOADING:
      return { ...state, isLoading: true, errMess: null, report: [] };

    case ActionTypes.REPORT_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        report: []
      };

    default:
      return state;
  }
};
