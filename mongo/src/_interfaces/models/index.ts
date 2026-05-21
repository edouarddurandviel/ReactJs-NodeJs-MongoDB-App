import { Document, ObjectId, WithId } from "mongodb";

export interface Company extends WithId<Document> {
  ref: number;
  name: string;
  isoCode: string;
  user_id: number;
}

export interface User extends WithId<Document> {
  email: string;
  password: string;
  _id: ObjectId;
}

export interface UserToken extends WithId<Document> {
  token: string;
  userId: string;
}
