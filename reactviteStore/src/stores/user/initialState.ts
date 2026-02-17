import type { WritableDraft } from "immer";
import type { User } from "./interfaces";

// Initial state
export const initialState = {
  // Payload
  users: [] as User[],
  user: null as unknown as User,
  addUser: {} as User,
  deleteUser: {} as User,
  filteredUsers: [] as User[],
  updateUser: {} as User,
  // Success
  usersSuccess: false,
  userSuccess: false,
  addUserSuccess: false,
  deleteUserSuccess: false,
  filteredUsersSuccess: false,
  updateUserSuccess: false,
  // Loading
  userLoading: false,
  usersLoading: false,
  addUserLoading: false,
  deleteUserLoading: false,
  filteredUsersLoading: false,
  updateUserLoading: false,
  // Error
  userErrors: false,
  usersErrors: false,
  addUserErrors: false,
  deleteUserErrors: false,
  filteredUsersErrors: false,
  updateUserError: false,

  reset: [],
};

export type State = typeof initialState;

// Reducer with Immer
export type Action = WritableDraft<{
  type: unknown;
  payload?: State;
}>;

export type action = {
  type: string;
  payload: State;
};
