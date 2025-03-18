import { Request, Response } from "express";
import UserService from "../services/UserService";

class UserController {
  async register(req: Request, res: Response) {
    try {
      const token = await UserService.registerUser(req.body);
      res.status(201).json({ message: "User registered successfully", token });
    } catch (error) {
      const errorMessage = (error as Error).message;
      res.status(400).json({ message: errorMessage });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const token = await UserService.loginUser(email, password);
      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      const errorMessage = (error as Error).message;
      res.status(401).json({ message: errorMessage });
    }
  }
  // Get All Users (Only Admin)
   getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserService.getAllUsersService();
    res.status(200).json(users);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).json({ message: "Error fetching users", error: errorMessage });
  }
};
}

export default new UserController();
