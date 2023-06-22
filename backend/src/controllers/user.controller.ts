// register a user

import { PrismaClient } from "@prisma/client";
import { Response, Request } from "express";

const prisma = new PrismaClient();

export const registerUser = async (req: Request, res: Response) => {
  const { lensProfile, test } = req.body;
  console.log("route was here");

  try {
    // check if user is qalready existing, if yes, return
    const userRecord = await prisma.user.findFirst({
      where: {
        lensHandle: lensProfile?.handle,
      },
    });

    if (userRecord) {
      // reject it
      res.status(200).json({
        message: "user already exists",
        user: userRecord,
      });
      return;
    } else {
      const user = await prisma.user.create({
        data: {
          wallet: lensProfile?.ownedBy,
          lensProfile: JSON.stringify(lensProfile),
          isVerified: false,
          lensHandle: lensProfile?.handle,
        },
      });

      if (user) {
        res.status(201).json({
          message: "user created successfully",
          user,
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      message: "something went wrong",
      err,
    });
  }
};

// get user by wallet adress
const fetchUser = async (req: Request, res: Response) => {
  try {
  } catch (err) {}
};

export const getAllUser = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findMany();
    res.status(200).json({
      user,
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong,",
      error: err,
    });
  }
};
