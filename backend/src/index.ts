import express, { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.get("/", (req, res) => {
  res.send("This route works!!");
});

app.listen(8000, () => {
  console.log(`Server is running on Prort- 8000`);
});
