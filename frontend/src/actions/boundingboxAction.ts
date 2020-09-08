import axios from "axios";
import {Dispatch} from "redux";
import ActionTypes from "./actionTypes";
import {InterData
} from "./InterfaceTypes";
import {API_ROOT} from "../services/api";

export const createItem = (data:InterData) => {
    return (dispatch:Dispatch) => {
        let response=axios.post<InterData[]>(`${API_ROOT}/create`,data);
        return Promise.resolve(response).then(
            response => {
                dispatch({
                    type:ActionTypes.CREATE_SUCCESS,
                    payload:response.data,
                });
                return response.data;
            },
            error => {
                dispatch({
                    type:ActionTypes.RECEIVE_ERROR,
                    payload:[],
                });
                throw error.message;
            }
        )
    }
};
export const findOneItems = (id:string) => {
    return (dispatch:Dispatch) => {
        let response= axios.post<InterData[]>(`${API_ROOT}/find`,{id:id}) ;
        return Promise.resolve(response).then(
            response => {
                dispatch({
                    type:ActionTypes.FIND_SUCCESS,
                    payload:response.data,
                });
            },
            error => {
                dispatch({
                    type:ActionTypes.RECEIVE_ERROR,
                    payload:[],
                });
                throw error.message;
            }
        );
    }
};
export function fetchHandler() {
    return (dispatch:Dispatch) => {
        let response= axios.get<InterData[]>(`${API_ROOT}/`) ;
        return Promise.resolve(response).then(
            response => {
                dispatch({
                    type:ActionTypes.FETCH_ALL_SUCCESS,
                    payload:response.data,
                })
            },
            error => {
                dispatch({
                    type:ActionTypes.RECEIVE_ERROR,
                    payload:[],
                });
                throw error.message;
            }
        );
    }
}