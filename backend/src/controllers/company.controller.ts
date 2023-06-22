import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

// job listing

export const getAllJobListings = async (req: Request, res: Response) => {
  try {
    const listings = await prisma.jobs.findMany();

    if (!listings) {
      res.status(400).json({
        message: "No listings found. create one",
      });
      return;
    }

    res.status(200).json({
      listings,
    });
  } catch (error) {
    res.status(500).json({
      message: `something went wrong, couldnt fetch all jobs -`,
      error: error,
    });
  }
};

// get job details by id

export const getSingleJob = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const jobPost = await prisma.jobs.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    res.status(200).json({
      jobPost,
    });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong, couldnt fetch",
      error: error,
    });
  }
};

// job post

export const newJoblisting = async (req: Request, res: Response) => {
  try {
    const {
      position,
      companyName,
      email,
      website,
      location,
      experienceRequired,
      jobDescription,
      salaryRange,
    } = req.body;

    console.log("bodyyyyyy", req.body);

    const jobpost = await prisma.jobs.create({
      data: {
        position,
        companyName,
        email,
        website,
        location,
        experience: experienceRequired,
        jobDescription,
        salaryRange,
        postedOn: new Date(),
      },
    });

    if (!jobpost) {
      res.status(400).json({
        message: "something went wrong while creating new job",
      });
      return;
    }

    res.status(201).json({
      message: "Success, job posted successfully",
      jobpost,
    });
  } catch (error) {
    res.status(500).json({
      message: "something went wrong, couldnt post",
      error: error,
    });
  }
};

export const getUserByLensId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findFirst({
      where: {
        lensHandle: id,
      },
    });

    res.json({
      message: "user found",
      user,
    });
  } catch (err) {
    res.send("no user found");
  }
};
