import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import env from "../util/validateEnv";
import {createUser, deleteUser, findUserByEmail, findUserById, getAllUsers, updateUser} from "../repositories/UserRepository";
import { IUser } from "../models/User";


const SECRET_KEY = env.SECRET_KEY || "default_secret_key";

class UserService {}
 
export const registerUser = async (userData: Partial<IUser>): Promise<string> => {
  const existingUser = await findUserByEmail(userData.email!);
  if (existingUser) throw new Error("Email already exists");

  userData.password = await bcrypt.hash(userData.password!, 10);
  const user = await createUser(userData);

  return generateToken(user);
};

export const loginUser = async (email: string, password: string): Promise<string> => {
  const user = await findUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid email or password");
  }

  return generateToken(user);
};

export const getAllUsersService = async () => {
  try {
    return await getAllUsers();
  } catch (error) {
    const errorMessage = (error as Error).message;
    throw new Error("Service Error: " + errorMessage);
  }
};

// Get User by ID
export const getUserByIdService = async (userId: string) => {
  try {
    const user = await findUserById(userId);
    return user;
  } catch (error) {
    const errorMessage = (error as Error).message;
    throw new Error("Service Error: " + errorMessage);
  }
};
// Update User
export const updateUserService = async (userId: string, data: Partial<IUser>) => {
  try {
    const updatedUser = await updateUser(userId, data);
    return updatedUser;
  } catch (error) {
    const errorMessage = (error as Error).message;
    throw new Error("Service Error: " + errorMessage);
  }
};

// Delete User
export const deleteUserService = async (userId: string) => {
  try {
    await deleteUser(userId);
  } catch (error) {
    const errorMessage = (error as Error).message;
    throw new Error("Service Error: " + errorMessage);
  }
};


export const generateToken = (user: IUser): string => {
  return jwt.sign(
    { id: user._id, email: user.email, role: user.userRole },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
};
  

