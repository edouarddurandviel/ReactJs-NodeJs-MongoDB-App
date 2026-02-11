import * as mongo from "mongodb";

export const collections: {
  companies?: mongo.Collection;
} = {};

export type CompanySocket = {
  refreshCompany: (userId: string, params: any) => void;
  refreshCompanyAddress: (addrId: string, params: any) => void;
  closeConnection: () => void;
};

export type CreateCompany = {
  ref: string;
  name: string;
  isoCode: string;
  publicPrice: string;
  price: mongo.Decimal128;
};

export type CreateManyCompanies = Array<{
  ref: string;
  name: string;
  isoCode: string;
}>;
