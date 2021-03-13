import * as ActionTypes from "../Types/ActionTypes";

export const AddBilling = (
  state = { isLoading: true, errMess: null, billing: [], edit: [], delete: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.POST_BILLING:
      let data = [];
      data.push(action.payload);
      return {
        ...state,
        isLoading: false,
        errMess: null,
        billing: data,
        edit: [],
        delete: []
      };

    case ActionTypes.EDIT_BILLING:
      let editData = [];
      editData.push(action.payload);
      return {
        ...state,
        isLoading: false,
        errMess: [],
        edit: editData,
        delete: [],
        billing: []
      };

    case ActionTypes.DELETE_BILLING:
      let deleteData = [];
      deleteData.push(action.payload);
      return {
        ...state,
        isLoading: false,
        errMess: null,
        delete: deleteData,
        billing: [],
        edit: []
      };

    case ActionTypes.BILLING_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        billing: [],
        delete: []
      };

    case ActionTypes.BILLING_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        billing: [],
        delete: []
      };

    default:
      return state;
  }
};
