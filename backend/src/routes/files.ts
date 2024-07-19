import express from "express";

import { uploadFile } from "../controllers/files";
import upload from "../config/multer";

const router = express.Router();

router.post("/", upload.single("file"), uploadFile);

export default router;
