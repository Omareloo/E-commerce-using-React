import { combineReducers } from "redux";
import getDataReducer from "./getdataReducer";




export default combineReducers({
    mygetDataReducer: getDataReducer,
})