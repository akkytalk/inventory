import * as ActionTypes from "../Types/ActionTypes";

export const AddClient = (
  state = { isLoading: true, errMess: null, client: [], edit: [], delete: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.POST_CLIENT:
      let data = [];
      data.push(action.payload);
      return {
        ...state,
        isLoading: false,
        errMess: null,
        client: data,
        edit: [],
        delete: []
      };

    case ActionTypes.EDIT_CLIENT:
      let editData = [];
      editData.push(action.payload);
      return {
        ...state,
        isLoading: false,
        errMess: [],
        edit: editData,
        delete: [],
        client: []
      };

    case ActionTypes.DELETE_CLIENT:
      let deleteData = [];
      deleteData.push(action.payload);
      return {
        ...state,
        isLoading: false,
        errMess: null,
        delete: deleteData,
        client: [],
        edit: []
      };

    case ActionTypes.CLIENT_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        client: [],
        delete: []
      };

    case ActionTypes.CLIENT_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        client: [],
        delete: []
      };

    default:
      return state;
  }
};
