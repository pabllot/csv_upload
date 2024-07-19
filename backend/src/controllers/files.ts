import { Request, Response } from "express";
import { saveCsvData } from "../services/fileService";

export const uploadFile = async (req: any, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    await saveCsvData(req.file.buffer);

    return res.status(200).send({ message: "The file was uploaded successfully." });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Error uploading the file. Please try again later." });
  }
};
