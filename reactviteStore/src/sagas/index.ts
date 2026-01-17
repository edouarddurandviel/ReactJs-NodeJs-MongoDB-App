import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";
import getAllCompaniesSaga from "./company/sagas";
import rootReducers from "../sagas/root-reducers";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(getAllCompaniesSaga);

// Export RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
