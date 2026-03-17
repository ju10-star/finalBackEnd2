import { UserModel } from "../models/user.model.js";

class UsersDAO {

  async getByEmail(email){
    return await UserModel.findOne({ email }).lean();
  }

  async create(user){
    return await UserModel.create(user);
  }

}

export const usersDAO = new UsersDAO();