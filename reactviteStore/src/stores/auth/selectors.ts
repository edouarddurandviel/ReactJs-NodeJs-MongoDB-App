import type { RootState } from "..";


const userSelector = (state: RootState) => state.auth.user;

const userLoadingSelector = (state: RootState) => state.auth.userLoading;

const userErrorsSelector = (state: RootState) => state.auth.userErrors;


export default {
  userLoadingSelector,
  userSelector,
  userErrorsSelector
};
