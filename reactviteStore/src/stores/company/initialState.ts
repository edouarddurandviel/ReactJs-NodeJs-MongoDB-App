import type { WritableDraft } from "immer";
import type { Company } from "./interfaces";

// Initial state
export const initialState = {
  // Payload
  companies: [] as Company[],
  company: {} as Company,
  addCompany: {} as Company,
  deleteCompany: {} as Company,
  filteredCompanies: [] as Company[],
  updateCompany: {} as Company,
  // Success
  companiesSuccess: false,
  companySuccess: false,
  addCompanySuccess: false,
  deleteCompanySuccess: false,
  filteredCompaniesSuccess: false,
  updateCompanySuccess: false,
  // Loading
  companyLoading: false,
  companiesLoading: false,
  addCompanyLoading: false,
  deleteCompanyLoading: false,
  filteredCompaniesLoading: false,
  updateCompanyLoading: false,
  // Error
  companyErrors: false,
  companiesErrors: false,
  addCompanyErrors: false,
  deleteCompanyErrors: false,
  filteredCompaniesErrors: false,
  updateCompanyError: false,

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
