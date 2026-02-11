import { combineReducers } from "redux";
import companyReducers from "./company/reducers";
import userReducers from "./user/reducers";

export const rootReducer = combineReducers({
  company: companyReducers,
  user: userReducers
});
