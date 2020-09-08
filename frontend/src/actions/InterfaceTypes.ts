import ActionTypes from "./actionTypes";

export interface InterData {
    height: number,
    _id: string,
    imgSrc: string,
    strokeRect: Array<any>,
    width: number,
    error?: any,
}
export interface InterFetchAction {
    type:ActionTypes.FETCH_ALL_SUCCESS,
    payload:InterData[],
}
export interface InterFindAction {
    type:ActionTypes.FIND_SUCCESS,
    payload:InterData[],
}
export interface InterCreateAction {
    type:ActionTypes.CREATE_SUCCESS,
    payload:InterData[],
}
export interface InterErrorAction {
    type:ActionTypes.RECEIVE_ERROR,
    payload:InterData[],
}

