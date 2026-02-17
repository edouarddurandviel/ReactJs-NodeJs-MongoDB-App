import { Unauthorized } from "http-json-errors";
import { AuthUser, CreateUser, UserData } from "../../_interfaces/user";
import * as userActions from "./actions";
import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";
import { UserToken } from "../../_interfaces/models";

class UserController {
  private _io;

  constructor(io: any) {
    this._io = io;
  }

  public async getAllUsers() {
    const user = await userActions.getAllUsers();
    return user;
  }

  public async createOneUser(data: CreateUser) {
    const passwordHash = await argon2.hash(data.password);
    const dataHash = {
      email: data.email,
      password: passwordHash
    };
    const user = await userActions.createOneUser(dataHash);
    return user;
  }

  public async getUserData(userId: string) {
    const user = (await userActions.getUserData(userId)) as unknown as UserData[];
    return user;
  }

  public async getOneUserWithEmail(email: string) {
    const user = await userActions.getOneUserWithEmail(email);
    return user;
  }

  public async login(email: string, password: string) {
    const user = await userActions.getOneUserWithEmail(email);
    if (await argon2.verify(user.password, password)) {
      // create jwt token
      const payload = { userId: user._id };
      const secret = password;
      const token = jwt.sign(payload, secret, { expiresIn: "1h" });
      await userActions.storeUserToken(token, user._id);

      const roles = await userActions.getUserData(user._id.toString());

      const userDetails = {
        email: roles[0].email
      };

      return { userDetails, token };
    } else {
      throw new Unauthorized("Invalid email or password");
    }
  }

  public async logout(userId: string) {
    const data = (await userActions.getUserTokenWithId(userId)) as unknown as UserToken;
    const result = await userActions.deleteUserToken(data.user_id);
    return result;
  }
}

export default UserController;
