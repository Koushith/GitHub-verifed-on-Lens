import express, { Request, Response } from "express";
import dotenv from "dotenv";
import {
  getAllJobListings,
  getSingleJob,
  newJoblisting,
} from "./controllers/company.controller.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT;

// Company
app.get("/company/job", getAllJobListings);
app.get("/company/job/:id", getSingleJob);
app.post("/company/job", newJoblisting);

app.get("/", (req, res) => {
  res.send("This route works!!");
});

app.listen(PORT, () => {
  console.log(`Server is running on Prort- ${PORT}`);
});
