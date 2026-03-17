import { usersDAO } from "../dao/mongo/managers/users.dao.js";

class UsersRepository {

  async getUserByEmail(email){
    return await usersDAO.getByEmail(email);
  }

  async createUser(user){
    return await usersDAO.create(user);
  }

}

export const usersRepository = new UsersRepository();