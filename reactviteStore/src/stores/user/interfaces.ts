import type { PathParamsObject } from "../../api/interface";

type Profil = {
  firstName: string;
  lastName: string;
  address: string;
  postCode: string;
  city: string;
  phone: string;
}

export type User = {
  name: string;
  email: string;
  password: string;
  token: string;
  profil?: Profil;
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

export interface UserState extends State {
  users?: User[];
  user?: User;
  documents?: Documents[];
}

export interface ResponseState {
  [key: string]: UserState;
}

export type Payload = {
  data: User;
  params: PathParamsObject;
  query: any;
};

export type Action = {
  type: string;
  payload: Payload;
};
