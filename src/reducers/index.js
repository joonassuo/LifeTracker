import idReducer from "./getUserId";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  userId: idReducer
});

export default allReducers;
