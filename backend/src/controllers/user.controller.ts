// register a user

import { PrismaClient } from "@prisma/client";
import { Response } from "express";

const prisma = new PrismaClient();

const registerUser = async (req: Request, res: Response) => {
  try {
    //check if user is qalready existing, if yes, return
  } catch (err) {}
};

// get user by wallet adress
const fetchUser = async (req: Request, res: Response) => {
  try {
  } catch (err) {}
};
