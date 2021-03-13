import * as ActionTypes from "../Types/ActionTypes";

export const AddUser = (
  state = { isLoading: true, errMess: null, user: [], edit: [], delete: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.POST_USER:
      let data = [];
      data.push(action.payload);
      return {
        ...state,
        isLoading: false,
        errMess: null,
        user: data,
        edit: [],
        delete: []
      };

    case ActionTypes.EDIT_USER:
      let editData = [];
      editData.push(action.payload);
      return {
        ...state,
        isLoading: false,
        errMess: [],
        edit: editData,
        delete: [],
        user: []
      };

    case ActionTypes.DELETE_USER:
      let deleteData = [];
      deleteData.push(action.payload);
      return {
        ...state,
        isLoading: false,
        errMess: null,
        delete: deleteData,
        user: [],
        edit: []
      };

    case ActionTypes.USER_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        user: [],
        delete: []
      };

    case ActionTypes.USER_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        user: [],
        delete: []
      };

    default:
      return state;
  }
};
