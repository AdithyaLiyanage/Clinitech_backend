import User, { IUser } from "../models/User";

class UserRepository {}

export const createUser = async (userData: Partial<IUser>): Promise<IUser> => {
  return await User.create(userData);
};

export const findUserByEmail = async (email: string): Promise<IUser | null> => {
  return await User.findOne({ email });
};

export const findUserById = async (id: string): Promise<IUser | null> => {
  return await User.findById(id);
};

export const getAllUsers = async (): Promise<IUser[]> => {
  try {
    return await User.find();
  } catch (error) {
    throw new Error("Error fetching users");
  }
};

export const updateUser = async (userId: string, data: Partial<IUser>) => {
  try {
    return await User.findByIdAndUpdate(userId, data, { new: true });
  } catch (error) {
    throw new Error("Error updating user");
  }
};

// Delete User
export const deleteUser = async (userId: string) => {
  try {
    return await User.findByIdAndDelete(userId);
  } catch (error) {
    throw new Error("Error deleting user");
  }
};

export default new UserRepository();
