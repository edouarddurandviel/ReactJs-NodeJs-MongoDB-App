import { put, takeLatest } from "redux-saga/effects";
import companyApi from "./requests";

function* getAllCompanies() {
  try {
    yield put({ type: "USER_FETCH_LOADING" });
    const user = companyApi.getAllCompanies();
    yield put({ type: "USER_FETCH_SUCCEEDED", user: user });
  } catch (e) {
    yield put({ type: "USER_FETCH_FAILED", message: e });
  }
}

export default function* getAllCompaniesSaga() {
  yield takeLatest("USER_FETCH_REQUESTED", getAllCompanies);
}
