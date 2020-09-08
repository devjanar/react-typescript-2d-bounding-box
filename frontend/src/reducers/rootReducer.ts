import { combineReducers } from "redux";
import boundingboxReducer from './boundingboxReducer'
import {InterData} from "../actions/InterfaceTypes";

export interface InterStoreState {
    boundingbox:InterData[],
}

export default combineReducers<InterStoreState>({
    boundingbox:boundingboxReducer
});