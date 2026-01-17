import { legacy_createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { rootReducer } from "./rootReducers";
import { rootMiddleware } from "./rootMiddleware";

const composedEnhancer = composeWithDevTools(rootMiddleware);

export const store = legacy_createStore(rootReducer, undefined, composedEnhancer);

// Export RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
