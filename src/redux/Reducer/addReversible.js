import * as ActionTypes from "../Types/ActionTypes";

export const AddReversible = (
  state = { isLoading: true, errMess: null, reversible: [], edit: [], delete: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.POST_REVERSIBLE:
      let data = [];
      data.push(action.payload);
      return {
        ...state,
        isLoading: false,
        errMess: null,
        reversible: data,
        edit: [],
        delete: []
      };

    case ActionTypes.EDIT_REVERSIBLE:
      let editData = [];
      editData.push(action.payload);
      return {
        ...state,
        isLoading: false,
        errMess: [],
        edit: editData,
        delete: [],
        reversible: []
      };

    case ActionTypes.DELETE_REVERSIBLE:
      let deleteData = [];
      deleteData.push(action.payload);
      return {
        ...state,
        isLoading: false,
        errMess: null,
        delete: deleteData,
        reversible: [],
        edit: []
      };

    case ActionTypes.REVERSIBLE_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        reversible: [],
        delete: []
      };

    case ActionTypes.REVERSIBLE_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        reversible: [],
        delete: []
      };

    default:
      return state;
  }
};
