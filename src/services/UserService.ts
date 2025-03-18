import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import env from "../util/validateEnv";
import UserRepository from "../repositories/UserRepository";
import { IUser } from "../models/User";


const SECRET_KEY = env.SECRET_KEY || "default_secret_key";

class UserService {
  async registerUser(userData: Partial<IUser>): Promise<string> {
    const existingUser = await UserRepository.findUserByEmail(userData.email!);
    if (existingUser) throw new Error("Email already exists");

    userData.password = await bcrypt.hash(userData.password!, 10);
    const user = await UserRepository.createUser(userData);

    return this.generateToken(user);
  }

  async loginUser(email: string, password: string): Promise<string> {
    const user = await UserRepository.findUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid email or password");
    }

    return this.generateToken(user);
    
  }// Get All Users
  async getAllUsersService(){
  try {
    const users = await UserRepository.getAllUsers();
    return users;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("Service Error: " + error.message);
    } else {
      throw new Error("Service Error: An unknown error occurred");
    }
  }
};

  private generateToken(user: IUser): string {
    return jwt.sign({ id: user._id, email: user.email, role: user.userRole }, SECRET_KEY, { expiresIn: "1h" });
  }
  
}

export default new UserService();
