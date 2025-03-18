import User, { IUser } from "../models/User";

class UserRepository {
  async createUser(userData: Partial<IUser>): Promise<IUser> {
    return await User.create(userData);
  }

  async findUserByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email });
  }

  async findUserById(id: string): Promise<IUser | null> {
    return await User.findById(id);
  }
  // Get All Users
  async getAllUsers(): Promise<IUser[]> {
  try {
    return await User.find();
  } catch (error) {
    throw new Error("Error fetching users");
  }
};
}

export default new UserRepository();
