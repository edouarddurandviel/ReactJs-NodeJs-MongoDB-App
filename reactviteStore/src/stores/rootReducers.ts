import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import companyReducers from "./company/reducers";
import userReducers from "./user/reducers";

export const rootReducer = combineReducers({
  company: companyReducers,
  user: userReducers,
});

const persistConfig = {
  key: 'root',
  storage,
};

export const persistedReducer = persistReducer(persistConfig, rootReducer);

