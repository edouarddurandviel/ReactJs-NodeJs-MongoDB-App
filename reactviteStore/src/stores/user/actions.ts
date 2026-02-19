import type { AppDispatch } from "..";
import * as actionType from "./types";
import requests from "./api";


export const getAllUsers = () => {
  return {
    type: actionType.GET_ALL_USERS_REQUEST,
  };
};

export const getOneUser = (data: object) => {
  return {
    type: actionType.GET_ONE_USER_REQUEST,
    payload: data,
  };
};

export const addOneUser = (data: object) => {
  return {
    type: actionType.ADD_ONE_USER_REQUEST,
    payload: data,
  };
};

export const deleteOneUser = (data: object) => {
  return {
    type: actionType.DELETE_ONE_USER_REQUEST,
    payload: data,
  };
};

export const updateOneUser = (data: object) => {
  return {
    type: actionType.UPDATE_ONE_USER_REQUEST,
    payload: data,
  };
};

export const getFilteredUsers = (data: object) => {
  return {
    type: actionType.FILTER_USERS_REQUEST,
    payload: data,
  };
};

export const reset = (data: string[]) => {
  return {
    type: actionType.USERS_RESET,
    payload: data,
  };
};

// thunk version with eventually side effects
export const getAllUsersThunk = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch({
        type: actionType.GET_ALL_USERS_LOADING,
      });
      const resp = await requests.getAllUsers();
      dispatch({
        type: actionType.GET_ALL_USERS_SUCCESS,
        payload: resp.data.data,
      });
    } catch (error: unknown) {
      dispatch({
        type: actionType.GET_ALL_USERS_FAILURE,
        payload: error,
      });
    }
  };
};

// thunk version with eventually side effects
export const resetThunk = (data: string[]) => {
  return async (dispatch: AppDispatch) => {
    dispatch({
      type: actionType.RESET,
      payload: data,
    });
  };
};
