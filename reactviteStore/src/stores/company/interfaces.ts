import type { PathParamsObject, QueryObject } from "../../api/interface";

export type Company = {
  name: string;
  ref: string;
  isoCode: string;
  _id?: string;
};

export type Documents = {
  _id: string;
  name: string;
  url: string;
};

interface State {
  loading: boolean;
  error: string | null;
}

export interface CompanyState extends State {
  companies?: Company[];
  company?: Company;
  documents?: Documents[];
}

export interface ResponseState {
  [key: string]: CompanyState;
}

export type Payload = {
  data: Company;
  params: PathParamsObject;
  query?: QueryObject;
};

export type Action = {
  type: string;
  payload: Payload;
};
