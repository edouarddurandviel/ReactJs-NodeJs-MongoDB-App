import companyReducer from "./company/slices";
import { type CompanyStateType } from "./company/types";

export type StateType = {
  companies: CompanyStateType;
};

const rootReducers = {
  companies: companyReducer,
};

export default rootReducers;
