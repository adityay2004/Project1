import { combineReducers } from "redux";
import reducer from "../Reducer/Reducer";
import reducerWishlist from "./ReduxWishlist";
import getDatareducer from "../../redux-toolkit/Reducer/ReducerSlice";
export default combineReducers({
    reducer ,reducerWishlist ,getDatareducer
})

