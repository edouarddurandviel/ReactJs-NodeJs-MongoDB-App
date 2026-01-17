import { combineReducers } from "redux";
import companyReducers from "./company/reducers";

export const rootReducer = combineReducers({
  company: companyReducers,
});
