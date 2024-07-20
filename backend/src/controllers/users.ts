import { Request, Response } from "express";
import { searchUsers } from "../services/userService";

export const getUsers = async (req: Request, res: Response) => {
  const query = req.query.q;

  try {
    const result = await searchUsers(query);
    return res.status(200).send(result);
  } catch (error) {
    return res.status(400).send({ message: "Error uploading the file. Please try again later." });
  }
};
