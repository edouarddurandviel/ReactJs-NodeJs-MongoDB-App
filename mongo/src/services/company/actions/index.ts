import { Company } from "../../../_interfaces/models";
import { CreateCompany, CreateManyCompanies } from "../../../_interfaces/company";
import { inCollection } from "@libs/mongodb";
import { BSON, ObjectId } from "mongodb";

// READ
export const getAll = async () => {
  const companyCollection = await inCollection("company");
  const document = (await companyCollection.find({}).toArray()) as unknown as Company[];
  return document;
};

// WRITE
export const createOne = async (data: CreateCompany) => {
  try{
     const companyCollection = await inCollection("company");
    const document = await companyCollection.insertOne(data);
    return document;

  }catch(e: any){
    e.errInfo.details.schemaRulesNotSatisfied.map((e: any) => {
      console.log(e.details)
    })
  }
};

export const insertMany = async (data: CreateManyCompanies) => {
  const companyCollection = await inCollection("company");
  const document = await companyCollection.insertMany(data);
  return document;
};

export const updateMany = async (isoCode: string, data: CreateCompany) => {
  const companyCollection = await inCollection("company");
  const document = await companyCollection.updateMany(
    { isoCode: isoCode },
    { set: { 
        "company.ref": data.ref 
      } 
    }
  );
  return document;
};

interface mongoReponse {
  acknowledged: boolean;
  modifiedCount: number;
  upsertedId: string | null;
  upsertedCount: number;
  matchedCount: number;
}

export const replaceOne = async (companyId: string, data: CreateCompany) => {
  const companyCollection = await inCollection("company");
  const response = await companyCollection.replaceOne(
    { _id: new ObjectId(companyId) },
    {
      name: data.name,
      ref: data.ref,
      isoCode: data.isoCode
    }
  );
  return response;
};

export const findOne = async (companyId: string) => {
  const companyCollection = await inCollection("company");
  const nid = new BSON.ObjectId(companyId);
  const document = await companyCollection.findOne({ _id: nid }) as unknown as Company;
  return document;
};

export const updateOne = async (companyId: string, data: CreateCompany) => {

  const companyCollection = await inCollection("company");
  const document = await companyCollection.updateOne(
    { _id: new ObjectId(companyId) },
    {
      $set: { 
        "name": data.name,
        "isoCode": data.isoCode,
        "ref": data.ref,
      },
      $currentDate: { 
        lastModified: true 
      }
    }
  );
  return document;
};

export const setAsReviewed = async (isoCode: string, data: CreateCompany) => {
  const companyCollection = await inCollection("company");
  const document = await companyCollection.updateMany({ isoCode: isoCode }, [
    {
      $addFields: {
        reviewed: true,
        completed: true
      },
      $currentDate: {
        lastModified: true
      }
    }
  ]);
  return document;
};

export const deleteOne = async (companyId: string) => {
  const companyCollection = await inCollection("company");
  const document = await companyCollection.deleteOne({ _id: new ObjectId(companyId) });
  return document;
};

// status: completed / processing / pending
export const multiStageProcessing_Status = async (status: string) => {
  const companyCollection = await inCollection("company");
  const document = await companyCollection.aggregate([ 
    { $group: { _id: "$_id", total: { $sum: "$price" } } },
    { $match: { status: status } },
    { // retreive columns
      $project: {
        _id: 1,
        name: 1
      }
    }
  ]);
  return document;
};
