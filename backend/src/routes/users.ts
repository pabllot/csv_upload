import express from "express";

import { getUsers } from "../controllers/users";

const router = express.Router();

router.get("/", getUsers);

export default router;
