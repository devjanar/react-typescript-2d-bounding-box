import {InterData,
  InterFetchAction,
  InterFindAction,
  InterCreateAction,
  InterErrorAction,
} from "../actions/InterfaceTypes";
import ActionTypes from '../actions/actionTypes'
const {
  CREATE_SUCCESS,
  FIND_SUCCESS,
  FETCH_ALL_SUCCESS,
  RECEIVE_ERROR
} =ActionTypes;

export default (state : InterData[]=[], action:InterFetchAction|InterFindAction|InterCreateAction|InterErrorAction) => {
  switch (action.type) {
    case CREATE_SUCCESS:
      return action.payload;
    case FIND_SUCCESS:
      return action.payload;
    case FETCH_ALL_SUCCESS:
      return action.payload;
    case RECEIVE_ERROR:
      return action.payload;
    default:
      return state
  }
}