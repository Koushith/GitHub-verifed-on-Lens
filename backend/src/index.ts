import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { getAllJobListings } from "./controllers/company.controller.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT;

// Company

app.get("/company/jobs", getAllJobListings);

app.get("/", (req, res) => {
  res.send("This route works!!");
});

app.listen(PORT, () => {
  console.log(`Server is running on Prort- ${PORT}`);
});
