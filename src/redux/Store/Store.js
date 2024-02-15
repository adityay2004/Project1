import { configureStore } from "@reduxjs/toolkit";
import rootreducer from "../Reducer/rootreducer";

const store=configureStore({
    reducer:rootreducer
});
 
export default store;