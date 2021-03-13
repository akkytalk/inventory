import * as ActionTypes from "../Types/ActionTypes";

export const Category = (
  state = { isLoading: true, errMess: null, category: [], categoryid: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_CATEGORY:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        category: action.payload
      };

    case ActionTypes.FETCH_CATEGORYID:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        categoryid: action.payload
      };

    case ActionTypes.CATEGORY_LOADING:
      return { ...state, isLoading: true, errMess: null, category: [] };

    case ActionTypes.CATEGORY_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        category: []
      };

    default:
      return state;
  }
};
