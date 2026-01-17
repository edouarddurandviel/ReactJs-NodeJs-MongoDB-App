import type { CompanyStateType } from "./types";

// Initial state
export const initialState = {
  companies: {
    data: [],
    loading: false,
    errors: "",
  } as unknown as CompanyStateType,
};
