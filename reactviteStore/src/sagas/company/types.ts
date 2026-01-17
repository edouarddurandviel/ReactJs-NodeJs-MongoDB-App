import type { Company } from "./interfaces";

export type CompanyStateType = {
  data: Company[];
  loading: boolean;
  errors: boolean;
};

export type CompanyPayload = {
  type: string;
  payload: Company[];
};
