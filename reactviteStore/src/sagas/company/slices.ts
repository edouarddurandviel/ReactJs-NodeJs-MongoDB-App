import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CompanyPayload } from "./types";
import { initialState } from "./initialState";

export const companySlices = createSlice({
  name: "companies",
  initialState,
  reducers: {
    getCompanies: (state) => {
      state.companies.loading = true;
      state.companies.errors = false;
    },
    getCompaniesSuccess: (state, { payload: companies }: PayloadAction<CompanyPayload>) => {
      state.companies.loading = false;
      state.companies.data = companies.payload;
    },
    resetCompanies: (state, { payload: _ }: PayloadAction<CompanyPayload>) => {
      state.companies.data = [];
    },
  },
});

export const { resetCompanies, getCompanies, getCompaniesSuccess } = companySlices.actions;
export default companySlices.reducer;
