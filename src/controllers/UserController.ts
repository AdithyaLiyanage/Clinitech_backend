
import { Request, Response } from "express";
import {deleteUserService, getAllUsersService, getUserByIdService, loginUser, registerUser, updateUserService} from "../services/UserService";
import User from "../models/User";

class UserController {}
 // Create User
export const createUser = async (req: Request, res: Response) => {
  const { fullName, email, phoneNumber, userRole, password } = req.body;

  try {
    const user = await registerUser({
      fullName,
      email,
      phoneNumber,
      userRole,
      password,
    });
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    const errorMessage = (error as Error).message;
    throw new Error("Service Error: " + errorMessage);
  }
};

// Login User
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    res.status(200).json({ message: "Login successful", result});
  } catch (error: any) {
    res.status(401).json({ message: error instanceof Error ? error.message : "Invalid email or password" });
  }
};

// Get All Users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsersService();
    res.status(200).json(users);
  } catch (error) {
    const errorMessage = (error as Error).message;
    throw new Error("Service Error: " + errorMessage);
  }
};

// Get User by ID
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await getUserByIdService(req.params.userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update User
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId;
    const updatedUser = await updateUserService(userId, req.body);
    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete User
export const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    await deleteUserService(userId);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    const errorMessage = (error as Error).message;
    throw new Error("Service Error: " + errorMessage);
  }
};



export default new UserController();
